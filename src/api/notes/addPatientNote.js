/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addPatientNote.js                                  :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/03 11:00:21 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/05 09:56:17 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, patientId, data, callback) => {

    const query = 'insert into note set ?;'
    const newData = {
            notes           :data.notes,
            fk_patient      :patientId,
            fk_user         :userId,
            permissions     :data.permissions,
            fk_medical_file :null,
            type            :data.type
        }
    if (data.type == undefined)
        newData.type = 0
    //console.log(newData)
    app.connection.query(query, newData, callback)
}