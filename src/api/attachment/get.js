/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   get.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 12:12:12 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 17:56:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, attachmentId, callback) => {

    const query = 'select creation_date,title,fk_user as userId,fk_type as type from attachment where id=?;'

    app.connection.query(query, attachmentId, (err, attachments)=>{
        if (err)
            return (callback(err))
        var array = []
        try{
            attachments.forEach(attachment => {
                const find_attach_query = 'select id,file_name from attach where fk_attachment = ?;'
                app.connection.query(find_attach_query, attachmentId, (err, attach)=>{
                    if (err)
                        return console.log(err);
                    attachment.files = attach
                    delete attachment.permissions
                    array.push(attachment)
                    if (array.length == attachments.length)
                        callback(err, array)
                })
            })
        }catch(e){
            callback(e)
        }
    })
}
