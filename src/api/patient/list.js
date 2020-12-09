/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/09 12:59:53 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles = require("../const/roles")

function listPatients(app, user, callback){

	var query = 'SELECT user.id as userid,user.email, patient.address, user.phone, user.first_name, user.last_name, patient.cin, patient.id as patientid,\
					country, postalcode, city,birthday,sexe from patient inner join user on user.id = patient.fk_user'
	console.log(user)
	if (user.role == roles.doctor.id)
		query += ' INNER JOIN medical_file on medical_file.fk_patient=patient.id and medical_file.fk_doctor= ' + user.userId
	query += ';'
	app.connection.query(query, callback)
}

module.exports = listPatients
