/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:30:52 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/09 18:31:31 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const AuthRouteClass  	= require('./api/auth/routes')
const AdminRouteClass 	= require('./api/admin/routes')
const UserRouteClass  	= require('./api/user/routes')
const PatientRouteClass	= require('./api/patient/routes')

const app = require('./initServer');

new AuthRouteClass(app)
new AdminRouteClass(app)
new UserRouteClass(app)
new PatientRouteClass(app)
app.get("/", (request, response) => {
	response.send("server is working");
})
