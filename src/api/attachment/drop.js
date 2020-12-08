/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   drop.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 12:07:47 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/08 18:02:06 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const fs = require('fs')

module.exports = (app, userId, attachmentId, callback) => {
    
    const dropQuery     = 'delete from attachment where fk_user=? and id=?;'

    
    const q = app.connection.query(dropQuery, [userId, attachmentId], (err, res)=>{
        if (err)
            return (callback(err))
        callback(err, res)
    })
}