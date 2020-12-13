/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listFiles.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/11 10:35:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/13 13:33:48 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listPatientMedicalFiles(app, patientId, callback)
{
    const query = 'select id, title, nurses, motif, summary, insurance, fk_insurance_type as insurance_type,\
        fk_doctor as doctor,creation_date from medical_file where fk_patient=?;'

    app.connection.query(query, patientId, callback)
}

module.exports = listPatientMedicalFiles
