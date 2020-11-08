/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:49:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/08 16:18:10 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function viewUser(app, id, callback)
{
    const query = `select user.id, first_name,last_name, email, title, role from user
                    inner join role on user.id = ? and role.title != 'patient' and user.role=role.id`
    app.connection.query(query, [id], callback);
}

module.exports = viewUser;
