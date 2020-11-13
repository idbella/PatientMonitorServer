/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 11:05:42 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listPatients(app, callback){
    const query = 'SELECT user.id as userid,user.first_name,user.last_name,patient.cin,patient.id as patientid\
                    from patient inner join user on user.id = patient.fk_user'
    app.connection.query(query, callback)
}

module.exports = listPatients
