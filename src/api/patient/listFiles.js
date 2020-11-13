/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listFiles.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/11 10:35:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/11 10:41:10 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listPatientMedicalFiles(app, patientId, callback)
{
    const query = 'select id,title from medical_file where fk_patient=?;'

    app.connection.query(query, patientId, callback)
}

module.exports = listPatientMedicalFiles
