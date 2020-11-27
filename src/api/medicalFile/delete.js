/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   delete.js                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/27 19:09:15 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/27 19:09:54 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

module.exports = (app, fileId, callback) => {
		
	const query = 'delete from medical_file where id = ?;';

	app.connection.query(query, fileId, callback);;
}
