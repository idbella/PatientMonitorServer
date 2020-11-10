/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:49:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/09 18:37:39 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function viewUser(app, session, id, callback)
{
	const query = `select user.id, first_name, email, title, fk_role from user
					inner join role on user.id = ? and user.fk_role=role.id;`
	if (session.userId != id)
		return callback({code:401});
	app.connection.query(query, [id], callback);
}

module.exports = viewUser;
