/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   initServer.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:29:02 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/05 10:09:33 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express       = require("express");
const parser        = require('body-parser');

const app = express();

app.listen("8080", (err) => {
    if (err)
        return console.log(err);
    console.log("server started at http://localhost:8080");
});

app.use(parser.urlencoded({ extended: false }))

module.exports = app;
