/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 16:31:55 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/02 16:32:46 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const addnurses = require('../medicalFile/nurses')
const types     = require('../const/fileType')

function addMedicalFile(app, patientId, data, callback)
{
    const newData = {
        fk_patient:patientId,
        title:data.title,
        motif:data.motif,
        insurance:data.insurance,
        fk_doctor:data.doctor,
        fk_insurance_type:data.insurance_type,
        nurses:data.nurses,
        type:data.type
    }
    console.log(data.type)
    if (data.type == undefined)
        newData.type = types.medical;
    if (undefined === data.insurance_type)
        delete newData.insurance_type
    if (undefined === data.doctor)
        delete newData.fk_doctor

    const query = 'insert into medical_file set ?;'

    const p = app.connection.query(query, newData, (err, res)=>{
        if (err)
            return callback(err)
        const fileId = res.insertId
        addnurses(app, fileId, data.nurses,()=>{})
        setCurrentMedicalFile(app, patientId, fileId)
        addAppointment(app, fileId, data.appointment)
        callback(err, res);
    })
    console.log(p)
}

function addAppointment(app, fileId, date)
{
    const query = 'INSERT INTO `appointment`(`date`,`fk_medical_file`) VALUES (?,?)'
    app.connection.query(query, [date, fileId] ,(err)=>{
        if (err)
            console.log(err)
    })
}

function setCurrentMedicalFile(app, patientId, fileId, callback)
{
    const query = 'update patient set fk_current_mFile=? where id=?;'
    app.connection.query(query, [fileId, patientId], callback)
}

module.exports = addMedicalFile;
