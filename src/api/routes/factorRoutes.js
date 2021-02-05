/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   factorRoutes.js                                    :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/04 15:38:08 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 15:45:28 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const addfactor = require('../riskFactor/add')

module.exports = (app) => {

    app.post('/api/patient/:patientId/factor', (request, response) => {
        const patientId = request.params.patientId
        addfactor(app, patientId, request.body, (err, result)=>{
            if (err){
                console.log('error',err)
                return response.sendStatus(500)
            }
            console.log(result)
            response.sendStatus(200);
        })
    })
}