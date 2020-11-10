/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   initServer.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:29:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 20:39:05 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express       = require("express");
const parser        = require('body-parser');
const mysql         = require('mysql')
const env           = require('dotenv').config();
const session       = require('express-session');
const verifyAuth    = require('./api/auth/verifyAuth');

const connection = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

connection.connect((err) => {
    if (err)
        console.log(err);
    }
);

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err);
    console.log(`server started at http://localhost:${process.env.PORT}/`);
});

app.use(parser.urlencoded({ extended: false }))

app.use((req,res,next)=>{
    console.log("new  connection")
    next()
})
app.connection = connection

app.verifyAuth = verifyAuth

module.exports = app
