/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   register.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:57 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/06 11:21:07 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt = require('bcrypt');

module.exports = (app, data, callback) => {
        bcrypt.hash(data.password, process.env.HASH_SALT,
            (err, hashedPassword) => {
                if (err)
                    return callback(err)
                const {connection} = app;
                const   {
                            email, first_name, last_name,
                            phone, cin, role, birthday
                        } = data
                const query = `insert into user (email, password, first_name, last_name, phone, cin, role, birthday)
                                values (?, ?, ?, ?, ?, ?, ?, ?)`;
                connection.query(query, [
                                            email, hashedPassword,
                                            first_name, last_name,
                                            phone, cin, role, birthday
                                        ],
                                callback
                            );
            }
        );   
}
