/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   viewUser.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 15:49:03 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/30 11:53:22 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function viewUser(app, id, callback)
{
    const query = `select user.id, first_name,last_name, email, user.title, fk_role as role from user
                    inner join role on user.id = ? and user.fk_role=role.id;`
    app.connection.query(query, [id], callback);
    console.log(id)
}

module.exports = viewUser;
