/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   editNote.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 15:15:33 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/04 12:04:03 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, noteId, data, callback) => {

    const query = 'update note set `notes`=?,permissions=? where note.id=? and fk_user=?;'
    app.connection.query(query, [data.notes, data.permissions, noteId, userId], callback)
}
