/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   attachmentRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:51:41 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 00:10:13 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles         = require('../const/roles')
const add           = require('../attachment/add')
const getAttachment = require('../attachment/get')
const dropAttachment= require('../attachment/drop')
const listAttachment= require('../attachment/list')
const getFile		= require('../attachment/getFile')

module.exports = (app) => {
	app.post('/api/file/:fileId/attachments', (request, response) => {
	
		const role = request.session.role
		const userId = request.session.userId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		if (request.files)
		{
			add(app, userId, request.params.fileId, request.files.attachment, request.body,
				(err, res) => {
					if (err)
					{
						console.log(err)
						return response.sendStatus(500)
					}
					response.sendStatus(200)
			})
		}
		else
			response.sendStatus(400)
	})

	app.delete('/api/attachments/:id', (request, response) => {
	
		const role = request.session.role
		const userId = request.session.userId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		getAttachment(app, request.params.id, (err, res)=>{
			if (err)
			{
				console.log(err)
				return response.sendStatus(500)
			}
			if (res && res[0])
			{
				const fileId = res[0].fk_medical_file
				const fileName = res[0].file_path
				dropAttachment(app, userId, fileId, fileName, (err, res)=>{
					if (err)
					{
						console.log(err)
						return response.sendStatus(500)
					}
					response.sendStatus(200)
				})
			}
			else
				response.sendStatus(404)
		})
	})

	app.get('/api/attachments/:id', (request, response) => {
	
		const role = request.session.role
		const userId = request.session.userId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		getAttachment(app, request.params.id, (err, res)=>{
			if (err)
			{
				console.log(err)
				return response.sendStatus(500)
			}
			if (res && res[0])
			{
				response.send(res[0])
			}
			else
				response.sendStatus(404)
		})
	})

	app.get('/api/file/:fileId/attachments/', (request, response) => {
	
		const role = request.session.role
		const fileId = request.params.fileId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		listAttachment(app, fileId, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(500)
			}
			if (res && res.length > 0)
				response.send(res)
			else
				response.sendStatus(404)
		})
	})

	app.get('/api/download/:fileId', (request, response) => {
		
		const role			= request.session.role
		const fileId		= request.params.fileId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		getFile(app, fileId, (err, res)=>{
			if (err)
			{
				console.log(err)
				return response.sendStatus(500)
			}
			if (res && res[0])
			{
				return response.download('resources/attachments/' + res[0].file_path, res[0].file_name, (err)=>{
					if (err)
					{
						console.log(err)
						response.send('unknown error');
					}
				})
			}
			else
				response.sendStatus(404)
		})
	})

}
