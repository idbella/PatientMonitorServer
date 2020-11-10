/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:28:51 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 22:57:01 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles             = require('../const/roles')
const addMedicalFile    = require('./addFile')
const editMedicalFile	= require('./edit')

module.exports = class UserRoutes
{
	constructor (app) {

		const verifyLogin = app.verifyAuth.verifylogin;

		app.post('/api/patients/:patientId/file', verifyLogin,
			(request, response) => {
				if (roles.receptionist.id !== request.session.role)
					return response.sendStatus(401)
				addMedicalFile(app, request.params.patientId, (err, res)=>{
					if (err)
					{
						console.log(err)
						return request.sendStatus(500)
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
	}
}