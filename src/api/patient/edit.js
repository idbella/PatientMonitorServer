/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/21 18:23:05 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 17:49:40 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const editUser          = require('../user/editUser')
const viewPatient       = require('./viewPatient')

function editPatient(app, patientId, data, callback) {

    viewPatient(app, patientId, (err, result)=>{
        if (err)
            return callback(err)
        if (result && result[0])
        {
            editUser(app, result[0].fk_user, data, (err, res)=>{
                if (err)
                    return callback(err)
                const   {connection} = app;
                const   newData = validate(data) 
            
                const   query = `update patient set ?;`;
                connection.query(query, newData, callback);
            });
        }
        else
            callback({code:404,msg:"patient not found"});
    })
}

function validate(data)
{
    var newData = {};
    if (data.cin && data.cin.length > 0)
        newData.cin = data.cin;
    if (data.city && data.city.length > 0)
        newData.city = data.city;
    if (data.country && data.country.length > 0)
        newData.country = data.country;
    if (data.birthday && data.birthday.length > 0)
        newData.birthday = data.birthday;
    if (data.sexe && data.sexe.length > 0)
        newData.sexe = data.sexe;
    if (data.postalcode && data.postalcode.length > 0)
        newData.postalcode = data.postalcode;
    return newData;
}

module.exports = editPatient;
