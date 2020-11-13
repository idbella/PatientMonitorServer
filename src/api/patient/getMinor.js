/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   getMinor.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 19:13:07 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/12 10:41:51 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

function getMinorPatient(app, userId, callback)
{
    var query = 'select * from minor where minor.fk_patient=?;'

    app.connection.query(query, userId, callback)
}

module.exports = getMinorPatient
