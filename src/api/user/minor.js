/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   minor.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 19:13:07 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 21:43:58 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function setPatientAsMinor(app,userId, data, callback)
{
    var query = 'select * from minor where minor.fk_user=?;'
    const insertData = {mother:data.mother, father:data.father, fk_user:userId}
    app.connection.query(query, userId, (err,res)=>{
        if (err)
            return callback(err)
        if (res.length > 0)
        {
            query =  'update minor set mother=?, father=? where fk_user=?;'
            app.connection.query(query, [data.mother,data.father,userId], callback)
        }
        else
        {
            query =  'insert into minor set ?;'
            app.connection.query(query, insertData, callback)
        }
    })
}

module.exports = setPatientAsMinor
