/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2021/02/04 15:31:38 by sid-bell          #+#    #+#             */
/*   Updated: 2021/02/04 15:48:25 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, patientId, data, callback) => {

    const query = `update patient set ? where patient.id = ?;`
    const newData = {
            dia     :data.dia,
            hta     :data.hta,
            obe     :data.obe,
            tab     :data.tab
        }
    console.log('update factor ' , newData)
    const qy = app.connection.query(query, [newData, patientId], callback)
    console.log(qy)
}
