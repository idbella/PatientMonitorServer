/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addNote.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/12 14:58:40 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 15:16:57 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, fileId, data, callback) => {

    const query = 'insert into note set ?;'
    const newData = {
            notes           :data.notes,
            fk_medical_file :fileId,
            fk_user         :userId
        }
    app.connection.query(query, newData, callback)
}
