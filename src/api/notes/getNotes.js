/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getNotes.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:02:36 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/04 12:47:18 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, user, fileId, callback) => {

    const role = user.role
    const id = user.userId

    const query = 'select user.id as userId, user.title, user.fk_role,\
                first_name,last_name, note.id,note.creation_date as date,notes,\
                fk_user as userId, permissions from note inner join user on fk_medical_File = ? and user.id = note.fk_user\
                and (note.fk_user = ? or note.permissions & ?);'
    app.connection.query(query, [fileId, id, role], callback)
}