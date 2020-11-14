/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   drop.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 12:07:47 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 18:26:59 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fs = require('fs')

module.exports = (app, userId, fileId, fileName, callback) => {
    
    const dropQuery     = 'delete from attachment where fk_user=? and fk_medical_file=?;'

    const q = app.connection.query(dropQuery, [userId, fileId], (err, res)=>{
        if (err)
            return (callback(err))
        const filePath = `${process.env.ATTACHMENT_DIR}/${fileName}`
        fs.unlink(filePath,(err)=>console.log(err))
        callback(err, res)
    })
    console.log(q)
}