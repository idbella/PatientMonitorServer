/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewPatient.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/11 09:46:50 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 10:50:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const getMinorPatient			= require('../patient/getMinor')
const listPatientMedicalFiles	= require('./listFiles')

function getPatientInfo(app, patientId, callback)
{
	const query = 'select * from patient inner join user on user.id=patient.fk_user and patient.id = ?;'
	app.connection.query(query, [patientId], (err, res) => {
		if (err || res && res.length == 0)
			callback(err, res)
		if (res && res[0] && res[0].password)
			delete res[0].password
		else
			return callback(err, res)
		getMinorPatient(app, patientId, (err, result)=>{
			if (err)
				return callback(err)
			if (result.length > 0)
				res[0].minor = {minor:true,mother:result[0].mother,father:result[0].father}
			listPatientMedicalFiles(app, patientId, (err, result)=>{
				if (err)
					return callback(err)
				if (result.length > 0)
					res[0].files = result;
				callback(err, res)
			})
		})
	})
}

module.exports = getPatientInfo
