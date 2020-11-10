/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   verifyAuth.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 22:59:47 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 23:00:54 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const roles = require('../const/roles')

function verifylogin(request, response, next) {

	const {userId}	= request.session
	if (userId) {
		next()
	} else {
		response.sendStatus(401)
	}
}

function verifylogout(request, response, next) {

	const {userId}	= request.session

	if (userId) {
		response.sendStatus(401)
	} else {
		next()
	}
}

function verifyAdmin(request, response, next){
	const {role}	= request.session;
	if ((role !== roles.admin.id))
	{
		console.log(`user ${request.session.userId} is not an admin ${role}`);
		return response.sendStatus(401);
	}
	next();
}

module.exports = {verifylogin:verifylogin, verifylogout:verifylogout, verifyAdmin:verifyAdmin};
