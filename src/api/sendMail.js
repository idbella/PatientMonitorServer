/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sendMail.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/14 10:04:00 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/14 21:40:02 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const nodemailer = require('nodemailer');

function sendMail(to, subject, msg) {
    var smtpConfig = {
        host: process.env.SMTP,
        port: process.env.SMTP_PORT,
        secure: true,
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASS
        }
    };
    console.log(smtpConfig)
    
    var transporter = nodemailer.createTransport(smtpConfig);

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: msg
    };
    transporter.sendMail(mailOptions, (error, info) => {
        console.log('done');
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
    }); 
}

module.exports = sendMail
