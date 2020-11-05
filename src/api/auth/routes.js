/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/05 10:42:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = class AuthRoutes
{
    constructor (app, login, register) {
        app.post('/api/login', (req, res) => {
            const {email, password} = req.body
            if (email && password)
            {
                login(email, password);
                 res.send('done');
            }
            else
                res.send("missing info");
           
        })
        app.post('/api/register', (req, res) => {
            const {email, password, first_name, last_name, phone, cin, role, birthday} = req.body
            register(email, password, first_name, last_name, birthday, cin, role)
            console.log(`register request = ${req.body}`);
        })
    }
}
