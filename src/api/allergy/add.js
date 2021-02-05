/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/04 12:13:07 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 15:08:22 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, patientId, data, callback) => {

    const query = 'insert into allergy set ?;'
    const newData = {
            title           :data.title,
            fk_patient      :patientId,
            description     :data.desc,
        }
    console.log('insert ' , newData)
    app.connection.query(query, newData, callback)
}