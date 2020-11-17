/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   adminRoutes.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/07 17:56:08 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/17 18:46:13 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const deleteUser    = require('../admin/deleteUser')
const editUser      = require('../admin/editUser')
const listUsers     = require('../admin/listUsers')
const viewUser      = require('../admin/viewUser')
const register		= require('../admin/register')

module.exports = (app) => {

	const verifyAdmin = app.verifyAuth.verifyAdmin;

	app.delete("/api/admin/users/:id", verifyAdmin, (request, response) => {
		deleteUser(app, request.params, request.session, (err, result) => {
			if (err) {
				console.log(err);
				return (response.sendStatus(err.code ? err.code : 500));
			}
			if (result.affectedRows === 0)
				return response.sendStatus(404);
			response.sendStatus(200);
		})
	})

	app.post('/api/admin/users/:id', verifyAdmin,
		(request, response) => {
			editUser(app, request.params.id, request.body, request.session,
				(err, result) => {
					if (err)
					{
						if (err.status)
							return response.status(err.status).send(err.msg);
						response.sendStatus(500);
						return console.log(err);
					}
					if (result.affectedRows === 0)
						return response.sendStatus(404);
					response.sendStatus(200);
				}
			)
		}
	)

	app.get('/api/admin/users', verifyAdmin, (request, response) =>{
		listUsers(app, request.session, (err, res)=>{
			if (err)
			{
				console.log(err)
				return response.sendStatus(500);
			}
			response.json(res);
		})
	})

	app.get('/api/admin/users/:id', verifyAdmin, (request, response) =>{
		viewUser(app, request.params.id, (err, res) => {
			if (err)
			{
				console.log(err)
				return response.sendStatus(500);
			}
			response.send(res);
		})
	})

	app.post('/api/register', verifyAdmin,
		(req, response) => {
			register(app, req.body,
				(err, res) => {
					if (err)
					{
						if (err.status)
							return response.status(err.status).send(err.msg);
						return console.log(err);
					}
					console.log(res)
					if (res.affectedRows > 0)
						response.sendStatus(200);
					else
						response.sendStatus(500);
				}
			)
		}
	)
}
