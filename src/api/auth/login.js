/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   login.js                                           :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:51:39 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/06 11:21:44 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt = require('bcrypt');

module.exports = (app, data, callback) => {
        const password = data.password;
        bcrypt.hash(password, process.env.HASH_SALT,
            (err, hashedPassword) => {
                if (err)
                    return callback(err)
                const {connection} = app;
                const {email} = data
                const query = `select * from user where email = ? and password = ?`;
                connection.query(query, [
                                            email, hashedPassword
                                        ],
                                callback
                            );
            }
        );   
}