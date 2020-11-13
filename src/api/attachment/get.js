/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 12:12:12 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 12:13:30 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, attachmentId, callback) => {
    const query = 'select * from attachment where id=?;'

    app.connection.query(query, attachmentId, callback)
}
