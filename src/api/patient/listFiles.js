/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listFiles.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/11 10:35:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/19 20:55:20 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles = require('../const/roles')

function listPatientMedicalFiles(app, user, patientId, callback)
{
    var query = 'select medical_file.id, title, nurses, motif, summary, insurance, fk_insurance_type as insurance_type,\
        fk_doctor as doctor,creation_date from medical_file  '
    if (user.role == roles.doctor.id)
        query += ' where fk_patient=? and fk_doctor=?;'
	else if (user.role == roles.nurse.id)
		query += ' INNER join nurses on nurses.fk_medical_file = medical_file.id and fk_patient=? and nurses.fk_user=?'
    app.connection.query(query, [patientId, user.userId], callback)
}

module.exports = listPatientMedicalFiles
