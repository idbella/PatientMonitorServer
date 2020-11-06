/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:30:52 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/06 11:19:34 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const AuthRouteClass = require('./api/auth/routes')
const loginhandler = require('./api/auth/login')
const registerhandler = require('./api/auth/register')
const app = require('./initServer');
new AuthRouteClass(app, loginhandler, registerhandler);
app.get("/", (request, response) => {
    response.send("server is working");
})
