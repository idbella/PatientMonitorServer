/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   notesRoutes.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/11 18:52:08 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/03 11:52:36 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const dropNote      = require('../notes/dropNote')
const getNotes      = require('../notes/getNotes')
const getPatientNotes= require('../notes/getPatientNotes')
const addPatientNote= require('../notes/addPatientNote')
const addNote       = require('../notes/addNote')
const editNote      = require('../notes/editNote')
const roles         = require('../const/roles')

module.exports = (app) => {
    app.post('/api/file/:fileId/notes/', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        addNote(app, request.session.userId,request.params.fileId, request.body, (err, res)=>{
            if (err)
            {
                console.log(err)
                
                return (response.sendStatus(500))
            }
            response.sendStatus(200)
        })
    })

    app.post('/api/patient/:patientId/notes/', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        addPatientNote(app, request.session.userId, request.params.patientId, request.body, (err, res)=>{
            if (err)
            {
                console.log(err)
            
                return (response.sendStatus(500))
            }
            response.sendStatus(200)
        })
    })

    app.get('/api/file/:fileId/notes/', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        getNotes(app, request.session, request.params.fileId, (err, res)=>{
            if (err)
            {
                console.log(err)
                return (response.sendStatus(500))
            }
            response.send(res)
        })
    })

    app.get('/api/patient/:patientId/notes/', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        getPatientNotes(app, request.session, request.params.patientId, (err, res)=>{
            if (err)
            {
                console.log(err)
                return (response.sendStatus(500))
            }
            response.send(res)
        })
    })

    app.post('/api/notes/:noteId', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        editNote(app, request.session.userId, request.params.noteId, request.body,
            (err, res) => {
                if (err)
                {
                    console.log(err)
                    return (response.sendStatus(500))
                }
                if (res && res.affectedRows > 0)
                    response.sendStatus(200)
                else
                    response.sendStatus(404)
            }
        )
    })

    app.delete('/api/notes/:noteId', (request, response) => {
        const role = request.session.role;
        if (role != roles.nurse.id && role != roles.doctor.id)
            return response.sendStatus(401)
        dropNote(app, request.session.userId, request.params.noteId,
            (err, res) => {
                if (err)
                {
                    console.log(err)
                    return (response.sendStatus(500))
                }
                if (res && res.affectedRows > 0)
                    response.sendStatus(200)
                else
                    response.sendStatus(404)
            }
        )
    })
}

