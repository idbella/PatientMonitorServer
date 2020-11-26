/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 17:45:06 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 16:29:08 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const registerHandler   = require('../admin/register')
const addMedicalFile    = require('../medicalFile/addFile')
const roles             = require('../const/roles')

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 100

function verifyInput(input, minlength, maxlength){
	const length = input ? input.length:0
	if (!input || length < minlength || length > maxlength)
		return false;
	return true;
}

function register(app, data, callback) {

	const   {email, first_name, last_name, phone} = data
	
	data.role = roles.patient.id
	registerHandler(app, data, (err, res) => {
		if (err)
			return callback(err)
		addPatient(app, res.insertId, data, callback)
	});
}

function addPatient(app, userId, data, callback){

	const   {connection} = app;
	var     newData =
	{
		cin:data.cin, birthday:data.birthday, postalcode:data.postalcode, address:data.address,
		country:data.country, sexe:data.sexe, city:data.city, fk_user:userId
	};

	const   query = `insert into patient set ?;`;
	connection.query(query, newData, (err, result)=>{
		if (err)
			return callback(err)
		if (result.affectedRows > 0)
			addMedicalFile(app, result.insertId, data, callback)
		else
			callback("database error");
	});
}

module.exports = register;
