/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   verifyAuth.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/10 22:59:47 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/26 15:19:33 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const responses = require('../const/responses')
const roles = require('../const/roles')

function verifylogin(request, response, next) {

	const {userId}	= request.session
	if (userId) {
		next()
	} else {
		response.sendStatus(responses.unauthorized.code)
	}
}

function verifylogout(request, response, next) {

	const {userId}	= request.session

	if (userId) {
		response.sendStatus(responses.unauthorized.code)
	} else {
		next()
	}
}

function verifyAdmin(request, response, next){
	const {role}	= request.session;
	if ((role !== roles.admin.id))
	{
		console.log(`user ${request.session.userId} is not an admin ${role}`);
		return response.sendStatus(responses.unauthorized.code);
	}
	next();
}

module.exports = {verifylogin:verifylogin, verifylogout:verifylogout, verifyAdmin:verifyAdmin};
