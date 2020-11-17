/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   sendMail.js                                        :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/14 10:04:00 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/16 11:16:23 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const nodemailer = require('nodemailer');

function sendMail(to, subject, msg, callback) {
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

    var transporter = nodemailer.createTransport(smtpConfig);

    let mailOptions = {
        from: process.env.EMAIL,
        to: to,
        subject: subject,
        text: msg
    };
    transporter.sendMail(mailOptions, callback);
}

module.exports = sendMail
