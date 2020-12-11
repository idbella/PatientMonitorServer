/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   attachmentRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:51:41 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/11 11:44:19 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles         = require('../const/roles')
const add           = require('../attachment/add')
const addFile       = require('../attachment/addFile')
const getAttachment = require('../attachment/get')
const dropAttachment= require('../attachment/drop')
const listAttachment= require('../attachment/list')
const getFile		= require('../attachment/getFile')
const http			= require('https')

var download = function(url ,res) {
	var request = http.get(url, function(response) {
	  response.pipe(res);
	}).on('error', function(err) {
		console.log(err);
		res.sendStatus(500)
	});
  };

module.exports = (app) => {
	app.post('/api/file/:fileId/attachments', (request, response) => {
	
		const role = request.session.role
		const userId = request.session.userId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		add(app, userId, request.params.fileId, request.body,
			(err, res) => {
				if (err)
				{
					console.log(err)
					return response.sendStatus(500)
				}
				response.sendStatus(200)
		})
	})

	app.post('/api/attachments/:attachmentId/file', (request, response) => {
	
		const role = request.session.role
		const userId = request.session.userId

		if (!(role == roles.doctor.id || role == roles.nurse.id))
			return response.sendStatus(401)
		if (request.files)
		{
			addFile(app, userId, request.params.attachmentId, request.files.file,
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
		dropAttachment(app, userId, request.params.id, (err, res)=>{
			if (err)
			{
				console.log(err)
				return response.sendStatus(500)
			}
			response.sendStatus(200)
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
				var url = 'https://bucketeer-b7cb112f-6d70-44fe-835f-010f16ada331.s3.amazonaws.com/public/' + res[0].file_path
				download(url, response)
			}
			else
				response.sendStatus(404)
		})
	})

	app.get('/api/youssef/:fileId/', (request, response) => {
	
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
			{
				var li = '';
				res.forEach(att => {
					att.files.forEach(file=>{
						if (li.length > 0)
							li += '\n'
						li += 'https://idbella.herokuapp.com/api/download/' + file.id
					})
				});
				response.send(li);
			}
			else
				response.sendStatus(404)
		})
	})
	
}
