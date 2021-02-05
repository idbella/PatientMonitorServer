/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/04 12:24:47 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 12:25:55 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, patientId, callback) => {

    const query = 'select * from allergy where fk_patient = ?;'
    app.connection.query(query, patientId, callback)
}