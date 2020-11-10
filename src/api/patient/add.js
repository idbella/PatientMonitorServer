/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 17:45:06 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 15:08:00 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const registerHandler   = require('../admin/register')
const addMedicalFile    = require('../medicalFile/addFile')

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 100
const MIN_CIN_LENGTH = 4
const MAX_CIN_LENGTH = 10

function verifyInput(input, minlength, maxlength){
    const length = input ? input.length:0
    if (!input || length < minlength || length > maxlength)
        return false;
    return true;
}

function register(app, data, callback) {

    const   {email, first_name, last_name, phone, cin} = data
    var     newData =
            {
                email:email, first_name:first_name,
                last_name:last_name, phone:phone, role:4
            };
    
    if (!(verifyInput(first_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH) &&
        verifyInput(last_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH) &&
        verifyInput(cin, MIN_CIN_LENGTH, MAX_CIN_LENGTH)))
        return callback({code:400})
    
    registerHandler(app, data, (err, res)=>{
        if (err)
            return callback(err)
        newData.userId = res.insertId
        addPatient(app, res.insertId, data, callback)
    });
}


function addPatient(app,userId, data, callback){

    const   {connection} = app;
    var     newData =
    {
        cin:data.cin, birthday:data.birthday,postalcode:data.postalcode,
        country:data.country,sexe:data.sexe,city:data.city, fk_user:userId
    };

    const   query = `insert into patient set ?;`;
    connection.query(query, newData, (err, result)=>{
        if (err)
            return callback(err)
        if (result.affectedRows > 0)
            addMedicalFile(app, result.insertId, callback)
        else
            callback("database error");
    });
}

module.exports = register;
