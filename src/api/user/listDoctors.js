/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listDoctors.js                                     :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 09:05:00 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/30 11:07:54 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles = require("../const/roles")

module.exports = (app, callback) => {

    const query = 'select user.id, first_name, last_name, email, creation_date, phone, title from user where fk_role = ?;' 
    app.connection.query(query, roles.doctor.id, callback)
}
