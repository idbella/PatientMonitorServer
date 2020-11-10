/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:28:51 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/08 16:42:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const editUser      = require('./editUser')
const viewUser      = require('./viewUser')

module.exports = class UserRoutes
{
    constructor (app) {

		const verifyLogin = app.verifyAuth.verifylogin;

        app.post('/api/file/', verifyLogin,
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
    }
}
