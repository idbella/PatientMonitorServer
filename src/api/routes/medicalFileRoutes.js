/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   medicalFileRoutes.js                               :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:28:51 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/22 13:35:22 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { response } = require('express');
const roles             = require('../const/roles')
const addMedicalFile    = require('../medicalFile/addFile')
const editMedicalFile	= require('../medicalFile/edit')

module.exports = (app) => {

	const verifyLogin = app.verifyAuth.verifylogin;

	app.post('/api/patients/:patientId/file', verifyLogin,
		(request, response) => {
			if (roles.receptionist.id !== request.session.role)
				return response.sendStatus(401)
			addMedicalFile(app, request.params.patientId, request.body, (err, res)=>{
				if (err)
				{
					console.log(err)
					return response.sendStatus(500)
				}
				response.sendStatus(200)
			})
		}
	)

	app.post('/api/file/:fileId', verifyLogin, (request, response) => {
		if (roles.receptionist.id !== request.session.role)
			return response.sendStatus(401)
		editMedicalFile(app, request.params.fileId, request.body,
			(err, result) => {
				if (err)
				{
					response.sendStatus(500);
					return console.log(err);
				}
				response.sendStatus(200);
			}
		)
	})

	app.get('/api/insurance', verifyLogin, (req, res)=>{
		const query = 'select * from insurance'
		app.connection.query(query, (err, result)=>{
			if (err)
				return res.sendStatus(500)
			res.json(result);
		})
	})
}
