/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:58:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 12:06:56 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { v4: uuidv4 } = require('uuid');

module.exports = (app, userId, medicalfileId, uploadedFile, data, callback) => {
	
	const fileName      = uuidv4()
	const attachmentDir = process.env.ATTACHMENT_DIR
	
	uploadedFile.mv(`${attachmentDir}/${fileName}`)

	const query     = 'insert into attachment set ?;'
	const newData   = {
						title			:data.title,
						file_name		:uploadedFile.name,
						file_path		:fileName,
						fk_medical_file	:medicalfileId,
						fk_user			:userId
					}
	app.connection.query(query, newData, callback)
}
