/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:59:21 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 22:57:18 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const editUser      = require('./editUser')
const viewUser      = require('./viewUser')
const setPatientAsMinor = require('./minor')
const roles             = require('../const/roles')

module.exports = class UserRoutes
{
    constructor (app) {

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


        app.post('/api/users/:id/minor', verifylogin, (req, res)=>{
            if (roles.receptionist.id !== req.session.role)
                res.sendStatus(401)
            setPatientAsMinor(app, req.params.id, req.body, (err, result)=>{
                if (err){
                    console.log(err)
                    return res.sendStatus(500)
                }
                res.sendStatus(200)
            })
        })

    }
}
