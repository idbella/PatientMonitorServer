/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   initServer.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:29:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/05 11:59:48 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express       = require("express");
const parser        = require('body-parser');
const mysql         = require('mysql')
const env           = require('dotenv').config();

const connection = mysql.createConnection({
    host     : process.env.HOST,
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

app.listen(process.env.PORT, (err) => {
    if (err)
        return console.log(err);
    console.log(`server started at http://${process.env.HOST}:${process.env.PORT}`);
});

app.use(parser.urlencoded({ extended: false }))

app.connection = connection;
module.exports = app;
