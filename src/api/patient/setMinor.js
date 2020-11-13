/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   setMinor.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 19:13:07 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 10:51:57 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function setPatientAsMinor(app, patientId, data, callback)
{
    var query = 'select * from minor where minor.fk_patient=?;'
    const insertData = {mother:data.mother, father:data.father, fk_patient:patientId}
    app.connection.query(query, patientId, (err,res)=>{
        if (err)
            return callback(err)
        if (res.length > 0)
        {
            query =  'update minor set mother=?, father=? where fk_patient=?;'
            app.connection.query(query, [data.mother,data.father, patientId], callback)
        }
        else
        {
            query =  'insert into minor set ?;'
            app.connection.query(query, insertData, callback)
        }
    })
}

module.exports = setPatientAsMinor
