/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:51:39 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/23 10:03:43 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt = require('bcrypt');

module.exports = (app, data, callback) => {
	const password = data.password;
	bcrypt.hash(password, process.env.HASH_SALT,
		(err, hashedPassword) => {
			if (err)
				return callback(err)
			const {connection}  = app;
			const {email}       = data
			const query         = ` select user.id, phone, first_name,last_name, email, title, fk_role as role from user
									inner join role on user.fk_role=role.id and
									user.email = ? and user.password = ?`;
			connection.query(query, [email, hashedPassword], callback);
		}
	);   
}