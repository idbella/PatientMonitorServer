/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:30:52 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/14 21:50:19 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const app = require('./initServer');

require('./api/routes/authRoutes')(app)
require('./api/routes/adminRoutes')(app)
require('./api/routes/userRoutes')(app)
require('./api/routes/patientRoutes')(app)
require('./api/routes/medicalFileRoutes')(app)
require('./api/routes/notesRoutes')(app)
require('./api/routes/attachmentRoutes')(app)

const sendMail = require('./api/sendMail')

app.get("/", (request, response) => {
	response.send("server is working");
})

app.get("/mail", (request, response) => {
	sendMail('idbellasaid@gmail.com', 'fdsf', 'sf')	
})
