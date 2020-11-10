/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   routes.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:45:34 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 12:22:31 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const addPatient    = require('./add')

module.exports = class PatientRoute
{
    constructor (app) {

		const verifyLogin = app.verifyAuth.verifylogin;

        app.post('/api/patient', verifyLogin,
            (request, response) => {
                if (request.session.role !== 0)
                    return (response.sendStatus(401));
                addPatient(app, request.body,
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
    }
}


/*
    admin       100 => 4000
    doctor      111 => 0700
    nurse       011 => 0030
    patient     001 => 0001
    reception   000 => 0000
*/