/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   deletePatient.js                                   :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/26 15:13:01 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 15:46:11 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const deleteUser = require("../admin/deleteUser");

module.exports = (app, patientId, callback) => {

	const findUserIdquery = 'select user.id from user inner join patient on patient.id = ?;'
	app.connection.query(findUserIdquery, patientId, (err, res) => {
		if (err)
			return callback(err);
		if (res.length <= 0)
			callback({code:404})
		deleteUser(app, {id:res[0].id})
	})
}
