/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   nurses.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/13 11:09:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/19 18:10:30 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function addnurses(app, medicalFileId, nurses, callback) {

    var query = 'insert into nurses (fk_medical_file,fk_user) values '
    if (nurses && nurses.length > 0)
    {
        let array = nurses.split(',')
        var values = undefined
        array.forEach(nurseId => {
            let id = parseInt(nurseId)
            if (!isNaN(id))
            {
                if (values == undefined)
                    values = `(${medicalFileId},${id})`
                else
                    values += `,(${medicalFileId},${id})`
            }
        });
        query += values + ';';
        if (values != undefined)
            app.connection.query(query, (err, res)=>{
                if (err)
                    console.log(err)
                callback(err, res)
            })
    }
}

module.exports = addnurses
