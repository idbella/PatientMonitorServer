/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/06 11:25:52 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = class AuthRoutes
{
    constructor (app, login, register) {
        app.post('/api/login', (req, response) => {
            const {email, password} = req.body
            if (email && password)
            {
                login(app, req.body, (err, res) => {
                    if (err)
                        return response.sendStatus(500);
                        if (res.length === 1)
                            response.sendStatus(200)
                        else
                            response.sendStatus(404);
                });
            }
            else
                response.sendStatus(400);
        })
        app.post('/api/register', (req, response) => {
            register(app, req.body, (err, res) => {
                if (err)
                {
                    response.sendStatus(500);
                    return console.log(err);
                }
                console.log(res);
            })    
        })
    }
}
