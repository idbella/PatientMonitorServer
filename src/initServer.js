/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   initServer.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:29:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/27 17:41:41 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express       = require("express");
const parser        = require('body-parser');
const mysql         = require('mysql')
const env           = require('dotenv').config();
const session       = require('express-session');
const verifyAuth    = require('./api/auth/verifyAuth');
const fileUpload    = require('express-fileupload')
const cors          = require('cors')
const connection = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(cors({
    origin: function(origin, callback){
        console.log('origin = ', origin)
      return callback(null, true);
    },
    credentials:true
}));

app.listen(process.env.PORT || 8080, (err) => {
    if (err)
        return console.log(err);
    console.log(`server started at http://localhost:${process.env.PORT||8080}/`);
});

app.use(parser.urlencoded({ extended: false }))

app.use(fileUpload({
    createParentPath: true
}));

app.connection = connection

app.verifyAuth = verifyAuth

module.exports = app
