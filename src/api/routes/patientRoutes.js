/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   patientRoutes.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:45:34 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 12:12:29 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const viewPatient       = require('../patient/viewPatient')
const addPatient        = require('../patient/add')
const setPatientAsMinor = require('../patient/setMinor')
const listPatients      = require('../patient/list')
const roles             = require('../const/roles')
const editPatient = require('../patient/edit')
const responses = require('../const/responses')
const deletePatient = require('../patient/deletePatient')
const { response } = require('express')

function random(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 }


module.exports = (app) => {

    const verifyLogin = app.verifyAuth.verifylogin;

    app.post('/api/patients/', verifyLogin,
        (request, response) => {
            if (request.session.role !== roles.receptionist.id)
                return (response.sendStatus(401));
            request.body.password = random(5);
            addPatient(app, request.body,
                (err) => {
                    if (err)
                    {
                        if (err.status)
                            return response.status(err.status).send(err.msg);
                        console.log(err);
                        response.sendStatus(err.code ? err.code : 500);
                        return console.log(err);
                    }
                    response.send(request.body.password);
                }
            )
        }
    )

    app.post('/api/patients/:patientId', verifyLogin,
        (request, response) => {
            if (request.session.role !== roles.receptionist.id)
                return (response.sendStatus(401));
            editPatient(app, request.params.patientId, request.body,
                (err) => {
                    if (err)
                    {
                        if (err.status)
                            return response.status(err.status).send(err.msg);
                        console.log(err);
                        response.sendStatus(500);
                        return console.log(err);
                    }
                    response.sendStatus(200);
                }
            )
        }
    )

    app.get('/api/patients/:id', verifyLogin, (req, res)=>{
        const role = req.session.role
		const recep = roles.receptionist.id
		const nurse = roles.nurse.id
		const doctor = roles.doctor.id
		if ((role != recep && doctor != role && nurse != role))
			return response.sendStatus(401);
        viewPatient(app, req.params.id, (err, result)=>{
            if (err)
                return res.sendStatus(500)
            res.send(result[0]);
        })
    })

    app.delete('/api/patients/:id', verifyLogin, (req, res)=>{
        if (req.session.role != roles.receptionist.id)
            return res.sendStatus(responses.unauthorized.code)
        deletePatient(app, req.params.id, (err, result)=>{
            if (err)
            {
                if (err.code)
                    return res.sendStatus(err.code)
                return res.sendStatus(500)
            }
            if (result.affectedRows > 0)
                res.sendStatus(responses.ok.code)
            else
                res.sendStatus(response.notfound.code)
        })
    })

    app.get('/api/patients/', verifyLogin, (req, res) => {
        const role = req.session.role
        const recep = roles.receptionist.id
		const nurse = roles.nurse.id
		const doctor = roles.doctor.id
		if ((role != recep && doctor != role && nurse != role))
			return response.sendStatus(401);
        listPatients(app, req.session, (err, result)=>{
            if (err)
            {
                console.log(err);
                return res.sendStatus(500)
            }
            res.send(result)
        })
    })

    app.post('/api/patient/:id/minor', verifyLogin, (req, res)=>{
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
