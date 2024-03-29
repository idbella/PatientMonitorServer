/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:59:21 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/13 07:35:41 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const editUser          = require('../user/editUser')
const viewUser          = require('../user/viewUser')
const listDoctors       = require('../user/listDoctors');
const roles             = require('../const/roles');
const listRecept        = require('../user/listRecept');
const listNurses		= require('../user/listNurses')

module.exports = (app) => {

	const verifylogin = app.verifyAuth.verifylogin;

	app.post('/api/users/:id', verifylogin,
		(request, response) => {
			userId = request.session.userId;
			if (userId != request.params.id)
				return (response.sendStatus(401));
			editUser(app, userId, request.body,
				(err, result) => {
					if (err)
					{
						response.sendStatus(err.code ? err.code : 500);
						return console.log(err);
					}
					response.sendStatus(200);
				}
			)
		}
	)

	app.get('/api/profile', verifylogin, (request, response) =>{

		viewUser(app, request.session.userId, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(err.code ? err.code : 500);
			}
			if (res && res[0])
				response.json(res[0]);
			else
				response.sendStatus(404)
		})
	})

	app.get('/api/doctors', verifylogin, (request, response) =>{
		const role = request.session.role;
		const admin = roles.admin.id
		const recep = roles.receptionist.id
		const nurse = roles.nurse.id
		const doctor = roles.doctor.id
		if ((role != admin && role != recep && doctor != role && nurse != role))
			return response.sendStatus(401);
		listDoctors(app, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(500);
			}
			response.json(res);
		})
	})

	app.get('/api/receptionists', verifylogin, (request, response) =>{
		if (request.session.role != roles.admin.id)
			return response.sendStatus(401);
		listRecept(app, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(500);
			}
			response.json(res);
		})
	})

	app.get('/api/nurses', verifylogin, (request, response) =>{
		const role = request.session.role;
		const admin = roles.admin.id
		const recep = roles.receptionist.id
		const nurse = roles.nurse.id
		const doctor = roles.doctor.id
		if ((role != admin && role != recep && doctor != role && nurse != role))
			return response.sendStatus(401);
		listNurses(app, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(500);
			}
			response.json(res);
		})
	})

}
