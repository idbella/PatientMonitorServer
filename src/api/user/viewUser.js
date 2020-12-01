/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:49:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/30 14:29:43 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function viewUser(app, id, callback)
{
	const query = `select user.id, phone, first_name,last_name, email, user.title, fk_role as role from user
					inner join role on user.id = ? and user.fk_role=role.id;`
	app.connection.query(query, [id], callback);
}

module.exports = viewUser;
