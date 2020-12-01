/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   authRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/01 20:32:49 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const login		= require('../auth/login')
const jwt		= require('jsonwebtoken')

module.exports =  (app) => {

	const verifylogout = app.verifyAuth.verifylogout;

	app.post('/api/login', verifylogout, (req, response) => {

		const {email, password} = req.body
		if (email && password)
		{
			login(app, req.body,
				(err, res) => {
					if (err){
						console.log(err);
						return response.sendStatus(500);
					
					}
					if (res.length === 1)
					{
						const user = {
							userId:res[0].id,
							role:res[0].role
						}
						jwt.sign(user, process.env.SESSION_SECRET, (err, token)=>{
							if (err)
								return response.sendStatus(500)
							res[0].token = token
							response.send(res[0])
						})
					}
					else
						response.sendStatus(404);
				}
			);
		}
		else
			response.sendStatus(400);
	})

	app.delete('/api/logout', (req, res)=>{
		req.session.destroy();
		res.sendStatus(200);
	})
}
