/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/12/08 00:07:38 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 00:08:08 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, fileId, callback) => {
    const query = 'select * from attach where id=?;'

    app.connection.query(query, fileId, callback)
}
