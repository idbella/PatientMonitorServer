/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   allergyRoutes.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/04 12:15:27 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 12:27:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const addAllergy = require('../allergy/add')
const getAllergy = require('../allergy/get')

module.exports = (app) => {

    app.post('/api/patient/:patientId/allergy', (request, response) => {
        const patientId = request.params.patientId
        addAllergy(app, patientId, request.body, (err, result)=>{
            if (err){
                console.log('error',err)
                return response.sendStatus(500)
            }
            response.sendStatus(200);
        })
    })

    app.get('/api/patient/:patientId/allergy', (request, response) => {
        const patientId = request.params.patientId
        getAllergy(app, patientId, (err, result)=>{
            if (err){
                console.log('error',err)
                return response.sendStatus(500)
            }
            response.send(result);
        })
    })
}