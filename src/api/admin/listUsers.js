/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listUsers.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:24:25 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/08 16:17:16 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listUsers(app, session, callback)
{
    const query = `select user.id, first_name,last_name, email, title, role from user
                    inner join role on role.title != 'patient' and user.role=role.id`
    app.connection.query(query, callback);
}

module.exports = listUsers;