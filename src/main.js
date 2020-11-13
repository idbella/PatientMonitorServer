/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:30:52 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/13 11:42:29 by sid-bell         ###   ########.fr       */
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

app.get("/", (request, response) => {
	response.send("server is working");
})
