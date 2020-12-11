/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   addFile.js                                         :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 10:58:17 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/11 11:25:48 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { v4: uuidv4 } = require('uuid')
const AWS = require('aws-sdk')



function uploadToS3(data, name){
	const s3bucket = new AWS.S3({
		accessKeyId: process.env.BUCKETEER_AWS_ACCESS_KEY_ID,
		secretAccessKey: process.env.BUCKETEER_AWS_SECRET_ACCESS_KEY
	})
  	const params = {
    	Bucket: process.env.BUCKETEER_BUCKET_NAME,
    	Key: "public" + "/" + name,
		Body: data,
		LocationConstraint: "us-east-1"
	}
	s3bucket.upload(params, (err, data) =>{
			if (err)
				console.log(err)
			else
				console.log('success ', data)
	})
}

module.exports = (app, userId, attachmentId, uploadedFile, callback) => {
	
	const fileName      = uuidv4()
	const query     = 'insert into attach set ?;'
	const newData   = {
						file_name		:uploadedFile.name,
						file_path		:fileName,
						fk_attachment	:attachmentId
					}
	uploadToS3(uploadedFile.data, fileName)
	app.connection.query(query, newData, callback)
}
