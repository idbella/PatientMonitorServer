/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   editUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 11:11:11 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/03 22:06:40 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, id, data, session, callback) => {

    var new_data = {};
    const { email, first_name, last_name, phone, role} = data;
    if (email && email.length > 0)
        new_data.email = email;
    if (first_name && first_name.length > 0)
        new_data.first_name = first_name;
    if (last_name && last_name.length > 0)
        new_data.last_name = last_name;
    if (phone && phone.length > 0)
        new_data.phone = phone;
    if (role && session.userId != id)
        new_data.fk_role = role;
    const query = `update user set ? where id=${id};`
    const   check_exist_query = 'select id from user where email =? and id != ?;'
    app.connection.query(check_exist_query, [email, id],
        (err, res) => {
            if (err)
                return (callback(err))
            if (res.length > 0)
                return (callback({status:300, msg:"email already exist."}));
            app.connection.query(query, new_data, callback)
    })
}
