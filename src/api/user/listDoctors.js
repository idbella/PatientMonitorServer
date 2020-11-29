/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listDoctors.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 09:05:00 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/29 22:42:13 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, callback) => {

    const query = 'select doctor.id, first_name, last_name, email, creation_date, phone, speciality from user inner join doctor on doctor.fk_user = user.id'
    app.connection.query(query, callback)
}
