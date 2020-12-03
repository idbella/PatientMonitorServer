/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deleteUser.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 10:23:24 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/03 10:30:01 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, data, session, callback) => {
		
	const query = 'delete from user where id = ?;';

	if (session && session.userId === parseInt(data.id))
		return callback({code:401,msg:'admin cannot delete his own account'});
	app.connection.query(query, [data.id], callback);;
}
