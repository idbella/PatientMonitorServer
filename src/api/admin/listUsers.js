/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   listUsers.js                                       :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:24:25 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 11:55:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function listUsers(app, session, callback)
{
    const query = `select user.id, first_name,last_name, email, title, fk_role from user
                    inner join role on role.id != 4 and user.fk_role=role.id`
    app.connection.query(query, callback);
}

module.exports = listUsers;