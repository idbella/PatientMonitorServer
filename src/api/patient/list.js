/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 12:09:59 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles = require("../const/roles")

function listPatients(app, user, callback){

	var query = 'SELECT user.id as userid,user.email, patient.address, user.phone, user.first_name, user.last_name, patient.cin, patient.id as patientid,\
					country, postalcode, city,birthday,sexe from patient inner join user on user.id = patient.fk_user'
	if (user.role == roles.doctor)
		query += ' inner join medical_file on fk_doctor = ' + user.userId
	query += ';'
	app.connection.query(query, callback)
}

module.exports = listPatients
