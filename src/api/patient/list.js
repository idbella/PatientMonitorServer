/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 10:55:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 17:43:12 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listPatients(app, callback){
    const query = 'SELECT user.id as userid,user.email, patient.address, user.phone, user.first_name, user.last_name, patient.cin, patient.id as patientid,\
                    country, postalcode, city,birthday,sexe from patient inner join user on user.id = patient.fk_user;'
    app.connection.query(query, callback)
}

module.exports = listPatients
