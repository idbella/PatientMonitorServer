/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   edit.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 20:37:30 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/29 23:23:28 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function editMedicalFile(app, fileId, data, callback)
{
    const newData = {title:data.title, insurance:data.insurance, summary:data.summary}
    const query = 'update medical_file set ? where id=?;'

    if (data.doctor)
        newData.fk_doctor = data.doctor 
    if (data.insurance_type)
        newData.fk_insurance_type = data.insurance_type
    app.connection.query(query, [newData, fileId], callback)
}

module.exports = editMedicalFile;
