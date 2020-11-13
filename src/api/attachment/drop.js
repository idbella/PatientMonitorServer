/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   drop.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/13 12:07:47 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 12:24:09 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, userId, fileId, callback) => {
    
    const dropQuery     = 'drop from attachment where fk_user=? and fk_medical_file=?;'
    const selectQuery   = 'select file_path from '
    app.connection.query(query, userId, fileId, (err, res)=>{
        if (err)
            return (callback(err))
        const fileName = res[0].file_name;
    })
}