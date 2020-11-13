/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   attachmentRoutes.js                                :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:51:41 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 12:23:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles         = require('../const/roles')
const add           = require('../attachment/add')
const getAttachment = require('../attachment/get')
const dropAttachment= require('../attachment/drop')

module.exports = (app) => {
    app.post('/api/file/:fileId/attachments', (request, response) => {
    
        const role = request.session.userId
        const userId = request.session.userId

        if (!(role == roles.doctor.id || role == roles.nurse.id))
            return response.sendStatus(401)
        if (request.files)
        {
            add(app, userId, request.params.fileId, request.files.attachment, request.body,
                (err, res) => {
                    if (err)
                    {
                        console.log(err)
                        return response.sendStatus(500)
                    }
                    response.sendStatus(200)
            })
        }
        else
            response.sendStatus(400)
    })

    app.delete('/api/file/:fileId/attachments/:id', (request, response) => {
    
        const role = request.session.userId
        const userId = request.session.userId
        const fileId = request.session.fileId

        if (!(role == roles.doctor.id || role == roles.nurse.id))
            return response.sendStatus(401)
        getAttachment(app, request.params.id, (err, res)=>{
            if (err)
            {
                console.log(err)
                return response.sendStatus(500)
            }
            if (res && res[0])
            {
                dropAttachment(app, userId, fileId, (err, res)=>{
                    if (err)
                    {
                        console.log(err)
                        return response.sendStatus(500)
                    }
                    response.sendStatus(200)
                })
            }
            else
                request.sendStatus(404)
        })
    })
}
