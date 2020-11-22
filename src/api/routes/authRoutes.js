/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   authRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/22 08:54:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const login		= require('../auth/login')

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
						req.session.userId = res[0].id;
						req.session.role = res[0].role;
						response.send(res[0]);
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
