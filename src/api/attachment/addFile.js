/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:58:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 17:06:39 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { v4: uuidv4 } = require('uuid');

module.exports = (app, userId, attachmentId, uploadedFile, data, callback) => {
	
	const fileName      = uuidv4()
	const attachmentDir = process.env.ATTACHMENT_DIR
	
	uploadedFile.mv(`${attachmentDir}/${fileName}`)

	const query     = 'insert into attach set ?;'
	const newData   = {
						file_name		:uploadedFile.name,
						file_path		:fileName,
						fk_attachment	:attachmentId
					}
	app.connection.query(query, newData, callback)
}
