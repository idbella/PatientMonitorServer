/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   add.js                                             :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: sid-bell <sid-bell@student.1337.ma>        +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2020/11/08 17:45:06 by sid-bell          #+#    #+#             */
/*   Updated: 2020/11/10 12:21:17 by sid-bell         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const MIN_NAME_LENGTH = 3
const MAX_NAME_LENGTH = 100
const MIN_CIN_LENGTH = 4
const MAX_CIN_LENGTH = 10

function verifyInput(input, minlength, maxlength){
    const length = input ? input.length:0
    if (!input || length < minlength || length > maxlength)
        return false;
    return true;
}

function register(app, data, callback) {

    const   {connection} = app;
    const   {email, first_name, last_name, phone, cin} = data
    var     newData =
                    {
                        email:email, first_name:first_name,
                        last_name:last_name, phone:phone, role:4
                    };
    const   query = `insert into user set ?;`;
    const   check_exist_query = 'select id from patient where cin = ?;'

    if (!(verifyInput(first_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH) &&
        verifyInput(last_name, MIN_NAME_LENGTH, MAX_NAME_LENGTH) &&
        verifyInput(cin, MIN_CIN_LENGTH, MAX_CIN_LENGTH)))
        return callback({code:400})
    
    bcrypt.hash(data.password, process.env.HASH_SALT,
        (err, hashedPassword) => {
            if (err)
                return callback(err)
            newData.password = hashedPassword;
            connection.query(check_exist_query, [cin],
                (check_err, check_res) => {
                    if (check_err)
                        return (callback(check_err))
                    if (res.length > 0)
                        return (callback({code:401,err:"email already exist."}));
                    connection.query(query, newData, (err, res)=>{
                        if (err)
                            return callback(err)
                        newData.userId = res.insertId
                        addPatient(app, res.insertId, data, (err, res)=>{
                            if (err)
                                return (callback(err))
                            response.sendStatus(200);
                        })
                    });
            })
        }
    );
}


function addPatient(app,userId, data, callback){

    const   {connection} = app;
    var     newData =
    {
        cin:cin, birthday:birthday,postalcode:postalcode,
        country:country,sexe:sexe,city:city, fk_user=userId
    } = data;
    const   query = `insert into patient set ?;`;

    connection.query(check_exist_query, [cin, birthday],
        (err, res) => {
            if (err)
                return (callback(err))
            if (res.length > 0)
                return (callback({code:401,err:"patient already exist."}));
            connection.query(query, newData, callback);
    })
}

module.exports = register;
