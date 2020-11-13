/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getNotes.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:02:36 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 10:21:41 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, fileId, callback) => {
    const query = 'select id,creation_date as date,notes,fk_user as userId from note where fk_medical_File = ?;'
    app.connection.query(query, fileId, callback)
}