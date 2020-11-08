/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deleteUser.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 10:23:24 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/08 11:10:36 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, data, session, callback) => {
		
	const query = 'delete from user where id = ?';

	if (session.userId === parseInt(data.id))
	{
		return callback('admin cannot delete his own account');
	}
	app.connection.query(query, [data.id], callback);;
}
