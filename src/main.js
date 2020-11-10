/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:30:52 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 22:19:19 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const AuthRouteClass  	= require('./api/auth/routes')
const AdminRouteClass 	= require('./api/admin/routes')
const UserRouteClass  	= require('./api/user/routes')
const PatientRouteClass	= require('./api/patient/routes')
const FileRouteClass	= require('./api/medicalFile/routes')

const app = require('./initServer');

new AuthRouteClass(app)
new AdminRouteClass(app)
new UserRouteClass(app)
new PatientRouteClass(app)
new FileRouteClass(app)

app.get("/", (request, response) => {
	response.send("server is working");
})
