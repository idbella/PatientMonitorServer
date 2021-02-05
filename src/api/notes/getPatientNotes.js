/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getPatientNotes.js                                 :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/02 16:56:15 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/05 09:47:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, user, patientId, callback) => {

    const role = user.role
    const id = user.userId

    const query = 'select user.id as userId, user.title, user.fk_role,\
                first_name,last_name,note.type, note.id,note.creation_date as date,notes,\
                fk_user as userId, permissions from note inner join user on fk_patient = ? and user.id = note.fk_user\
                and (note.fk_user = ? or note.permissions & ?);'
    app.connection.query(query, [patientId, id, role], callback)
}