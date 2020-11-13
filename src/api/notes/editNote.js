/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   editNote.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 15:15:33 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 15:23:52 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, noteId, data, callback) => {

    const query = 'update note set `notes`=? where note.id=? and fk_user=?;'
    app.connection.query(query, [data.notes, noteId, userId], callback)
}
