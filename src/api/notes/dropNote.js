/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   dropNote.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 09:59:13 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 10:00:07 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, noteId, callback) => {

    const query = 'delete from note where note.id=? and fk_user=?;'
    app.connection.query(query, [noteId, userId], callback)
}
