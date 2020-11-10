/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:31:55 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 21:58:33 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function addMedicalFile(app, patientId, callback)
{
    const data = {fk_patient:patientId}
    const query = 'insert into medical_file set ?;'

    app.connection.query(query, data, (err, res)=>{
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
