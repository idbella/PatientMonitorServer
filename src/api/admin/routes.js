/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/07 17:56:08 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/09 10:33:16 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const deleteUser    = require('./deleteUser')
const editUser      = require('./editUser')
const listUsers     = require('./listUsers')
const viewUser      = require('./viewUser')
const register		= require('./register')

module.exports = class AdminRoutes
{
	constructor (app) {

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
							response.sendStatus(500);
							return console.log(err);
						}
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
				response.send(res);
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
							response.sendStatus(500);
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
}
