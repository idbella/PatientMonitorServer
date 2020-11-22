/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listRecept.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/22 09:05:00 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/22 09:39:47 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, callback) => {

    const query = 'select user.id, first_name, last_name, email, creation_date, phone from user inner join role on role.id = user.fk_role and role.id = 5;'
    app.connection.query(query, callback)
}
