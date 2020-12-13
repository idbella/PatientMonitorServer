/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   register.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/05 09:52:57 by sid-bell          #+#    #+#             */
/*   Updated: 2020/12/13 17:57:59 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const bcrypt    = require('bcrypt');
const roles     = require('../const/roles')
const sendMail  = require('../sendMail')

function random(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function register(app, data, callback) {

    const   {connection} = app;
    const   {title, email, first_name, last_name, phone, role} = data
    var     newData = {title:title,email:email, first_name:first_name, last_name:last_name, phone:phone, fk_role:role};
    const   query = `insert into user set ?;`;
    const   check_exist_query = 'select id from user where email =?;'

    data.password = random(8)
    bcrypt.hash(data.password, process.env.HASH_SALT,
        (err, hashedPassword) => {
            if (err)
                return callback(err)
            newData.password = hashedPassword;
            connection.query(check_exist_query, [email],
                (err, res) => {
                    if (err)
                        return (callback(err))
                    if (res.length > 0)
                        return (callback({status:300, msg:"email already exist."}));
                    connection.query(query, newData, (err)=>{
                        if (err)
                            return callback(err)
                        else
                            sendMail(newData.email, 'Account created | Digital Hospital', '', getHtmlMessage(data))
                    });
            })
        }
    );
}

function getHtmlMessage(data){
    var html = `<h3>Hi ${data.first_name} ${data.last_name}</h3>
    <p>this email is a validation email from XR Patinet Monitoring App</p>
    <p>You have been added as type in Patient Monitoring here is your credentials</p>
    <p><b>user name</b>${data.email}</p>
    <p><b>password</b>${data.password}</p>
    <p>please change your password</p>`
}

module.exports = register;
