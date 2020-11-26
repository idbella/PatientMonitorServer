/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:31:55 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 14:34:51 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function addMedicalFile(app, patientId, data, callback)
{
    const newData = {
                    summary:data.summary,
                    fk_patient:patientId,
                    title:data.title,
                    motif:data.motif,
                    insurance:data.insurance,
                    fk_doctor:data.doctor,
                    fk_insurance_type:data.insurance_type
                }
    if (undefined === data.insurance_type)
        delete newData.insurance_type
    if (undefined === data.fk_doctor)
        delete newData.fk_doctor

    const query = 'insert into medical_file set ?;'

    app.connection.query(query, newData, (err, res)=>{
        if (err)
            return callback(err)
        if (res.affectedRows > 0)
            setCurrentMedicalFile(app, patientId, res.insertId, callback)
        else
            callback("database error");
    })
}

function setCurrentMedicalFile(app, patientId, fileId, callback)
{
    const query = 'update patient set fk_current_mFile=? where id=?;'
    app.connection.query(query, [fileId, patientId], callback)
}

module.exports = addMedicalFile;
