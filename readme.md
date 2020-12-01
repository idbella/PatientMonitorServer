API documentation

Login : /api/login
method: POST
params:{email:string,password:string}
response:{404:invalid email/password, 200: success}

register (Admin only): /api/register
method: POST
params:{email:string, first_name:string, last_name:string, phone:string, role:integer}
response:{401:permission denied, 200:success, 300:email already exist}

delete user (admin ONLY) : /api/admin/users/:id
method: DELETE
response:{401:permission denied, 404:user id not found, 200:success}

edit user (admin Only): /api/admin/users/:id
method: POST
params:{email:string, first_name:string, last_name:string, phone:string, role:integer}
response:{200:success, 300:email already exist, 404:user id not found}

all Users List (admin only): /api/admin/users
method:GET
response:{401:permission denied, 200: (json) list of all users with thier info}

User info (admin only): /api/admin/users/:id
method:GET
response:{401:permission denied, 200:(json) user info}

register (Admin only): /api/register
method: POST
params:{title:string, email:string, first_name:string, last_name:string, phone:string, role:integer}
response:{401:permission denied, 200:success, 300:email already exist}

Logout : /api/logout
method:DELETE
response:{200:ok}

loggedin user info /api/profile
method:GET
response:{
    200:{userId, phone, first_name,last_name, email, title, role}
    401:not logged in
    500:server error
}

update loggedin user info /api/users/:userId
method:POST
params:{title:string, email:string, first_name:string, last_name:string, phone:string, role:integer}
response:{200:ok,404:use not found,500:server error,300:email already exit}




