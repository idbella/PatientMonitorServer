/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   register.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:57 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/30 11:41:24 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt    = require('bcrypt');
const roles     = require('../const/roles')

function register(app, data, callback) {

    const   {connection} = app;
    const   {title, email, first_name, last_name, phone, role} = data
    var     newData = {title:title,email:email, first_name:first_name, last_name:last_name, phone:phone, fk_role:role};
    const   query = `insert into user set ?;`;
    const   check_exist_query = 'select id from user where email =?;'

    bcrypt.hash(data.password, process.env.HASH_SALT,
        (err, hashedPassword) => {
            if (err)
                return callback(err)
            newData.password = hashedPassword;
            connection.query(check_exist_query, [email],
                (err, res) => {
                    if (err)
                        return (callback(err))
                    if (res.length > 0)
                        return (callback({status:300, msg:"email already exist."}));
                    connection.query(query, newData, callback);
            })
        }
    );
}


module.exports = register;
