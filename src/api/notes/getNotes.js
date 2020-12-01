/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getNotes.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:02:36 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/30 14:41:19 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, fileId, callback) => {
    const query = 'select user.title, user.fk_role, first_name,last_name, note.id,note.creation_date as date,notes,fk_user as userId from note inner join user on fk_medical_File = ? and user.id = note.fk_user;'
    app.connection.query(query, fileId, callback)
}