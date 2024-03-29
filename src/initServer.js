/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   initServer.js                                      :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/04 18:29:02 by sid-bell          #+#    #+#             */
/*   Updated: 2021/01/30 16:58:05 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const express       = require("express")
const parser        = require('body-parser')
const mysql         = require('mysql')
const env           = require('dotenv').config()
const verifyAuth    = require('./api/auth/verifyAuth')
const fileUpload    = require('express-fileupload')
const cors          = require('cors')
const jwt           = require('jsonwebtoken')


const connection    = mysql.createPool(process.env.CLEARDB_DATABASE_URL);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', '*');
  res.header("Access-Control-Allow-Methods", "OPTIONS, POST, GET, PUT, DELETE");
  if ('OPTIONS' == req.method) {
      return res.sendStatus(200);
  } else {
      next();
  }
});

app.use(cors({
    origin: function(origin, callback){
      return callback(null, true);
    }
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

app.use((req, res, next)=>{
    
    const auth = req.headers.authorization;
    
    req.session = {}
    
    if (auth != undefined)
    {
        token = auth.split(' ')[1]
       
        jwt.verify(token, process.env.SESSION_SECRET, (err, user)=>{
            if (err)
                return res.status(403).send('invalid token')
            else
                req.session = user
            next();
        })
    }
    else
        next();
})

app.connection = connection

app.verifyAuth = verifyAuth

module.exports = app
