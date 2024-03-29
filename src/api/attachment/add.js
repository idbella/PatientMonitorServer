/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:58:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 15:11:59 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { v4: uuidv4 } = require('uuid');

module.exports = (app, userId, medicalfileId, data, callback) => {

	const query     = 'insert into attachment set ?;'
	const newData   = {
						title			:data.title,
						fk_medical_file	:medicalfileId,
						fk_user			:userId,
						fk_type			:data.type
					}
	app.connection.query(query, newData, callback)
}
