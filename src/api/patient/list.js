/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 16:16:35 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { nurse } = require("../const/roles")
const roles = require("../const/roles")

function listPatients(app, user, callback){

	var query = 'SELECT user.id as userid,user.email, patient.address, user.phone, user.first_name, user.last_name, patient.cin, patient.id as patientid,\
					dia,tab,hta,obe, country, postalcode, city,birthday,sexe from patient inner join user on user.id = patient.fk_user\
					WHERE EXISTS (select 1 from medical_file where medical_file.fk_patient=patient.id)'
	if (user.role == roles.doctor.id)
		query += '  and EXISTS (select medical_file.id from medical_file where medical_file.fk_doctor= ' + user.userId + ')'
	if (user.role == roles.nurse.id)
		query += ' and EXISTS (select 1 from medical_file inner join nurses on nurses.fk_medical_file = medical_file.id and nurses.fk_user = ' + user.userId + ')'
	query += ';'
	console.log(query)
	app.connection.query(query, (err,result)=>{
		if (err)
			return (callback(err))
		callback(err, result)
	})
}

module.exports = listPatients
