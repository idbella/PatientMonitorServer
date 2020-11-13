/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   userRoutes.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:59:21 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 10:48:16 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const editUser          = require('../user/editUser')
const viewUser          = require('../user/viewUser')
const roles             = require('../const/roles')

module.exports = (app) => {

    const verifylogin = app.verifyAuth.verifylogin;

    app.post('/api/users/:id', verifylogin,
        (request, response) => {
            editUser(app, request.body, request.session,
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

    app.get('/api/users/:id', verifylogin, (request, response) =>{
        viewUser(app, request.session, request.params.id, (err, res) => {
            if (err)
            {
                console.log(err)
                return response.sendStatus(err.code ? err.code : 500);
            }
            response.send(res);
        })
    })

}
