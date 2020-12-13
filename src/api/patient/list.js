/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/13 16:07:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { nurse } = require("../const/roles")
const roles = require("../const/roles")

function listPatients(app, user, callback){

	var query = 'SELECT nurses, user.id as userid,user.email, patient.address, user.phone, user.first_name, user.last_name, patient.cin, patient.id as patientid,\
					country, postalcode, city,birthday,sexe from patient inner join user on user.id = patient.fk_user INNER JOIN medical_file on medical_file.fk_patient=patient.id'
	console.log(user)
	if (user.role == roles.doctor.id)
		query += '  and medical_file.fk_doctor= ' + user.userId
	query += ';'

	app.connection.query(query, (err,result)=>{
		if (err)
			return (callback(err))
		if (user.role == roles.nurse.id)
		{
			var patients = [];
			if (result.length > 0)
			{
				result.forEach(patient => {
					if (patient.nurses)
					{
						nurses = patient.nurses.split(',')
						nurses.forEach(nurseId=>{
							console.log(nurseId + ' vs ' + user.userId)
							if (nurseId == user.userId)
								patients.push(patient)
						})
					}
				});
			}
			return callback(err, patients)
		}
		callback(err, result)
	})
}

module.exports = listPatients
