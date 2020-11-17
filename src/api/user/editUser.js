/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   editUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 11:48:56 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/16 16:05:44 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt = require('bcrypt');

module.exports = (app, data, session, callback) => {

    const newData = validate(data)
    if (Object.keys(newData).length <= 0)
        callback({err})
    const query = `update user set ? where id=${session.userId};`
    const check_exist_query = 'select id from user where email =?;'
    app.connection.query(check_exist_query, [newData.email],
        (err, res) => {
            if (err)
                return (callback(err))
            if (res.length > 0)
                return (callback({status:300, msg:"email already exist."}));
            app.connection.query(query, new_data, callback)
            if (newData.password && newData.password.length > 0)
            {
                bcrypt.hash(newData.password, process.env.HASH_SALT, (err, hashedPassword) => {
                    if (err)
                        return callback(err);
                    newData.password = hashedPassword
                    app.connection.query(query, newData, callback)
                })
            }
            app.connection.query(query, newData, callback) 
    })
}

function validate(data){
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
    if (password && password.length > 0)
        newData.password = password
    return (newData)
}
