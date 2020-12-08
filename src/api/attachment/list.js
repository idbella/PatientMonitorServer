/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   list.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 18:35:41 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 17:56:57 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, fileId, callback) => {
    const query = 'select id,creation_date,title,fk_user as userId,fk_type as type from attachment where fk_medical_file=?;'

    app.connection.query(query, fileId, (err, attachments)=>{
        if (err)
            return (callback(err))
        var array = []
        try{
            attachments.forEach(attachment => {
                const find_attach_query = 'select id,file_name from attach where fk_attachment = ?;'
                app.connection.query(find_attach_query, attachment.id, (err, attach)=>{
                    if (err)
                        return console.log(err)
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
