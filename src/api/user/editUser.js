/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   editUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 11:48:56 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/08 16:41:05 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt = require('bcrypt');

module.exports = (app, data, session, callback) => {

    var newData = {};
    const { email, first_name, last_name, phone, birthday, password, cin} = data;
    if (email && email.length > 0)
        newData.email = email;
    if (first_name && first_name.length > 0)
        newData.first_name = first_name;
    if (last_name && last_name.length > 0)
        newData.last_name = last_name;
    if (phone && phone.length > 0)
        newData.phone = phone;
    if (birthday && birthday.length > 0)
        newData.birthday = birthday
    if (cin && cin.length > 0)
        newData.cin = cin
    bcrypt.hash(password, process.env.HASH_SALT, (err, hashedPassword) => {
        if (err)
            callback(err);
        if (password && password.length > 0)
            newData.password = hashedPassword
        const query = `update user set ? where id=${session.userId};`
        app.connection.query(query, newData, callback)
    })
}
