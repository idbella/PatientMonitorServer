
function verifylogin(request, response, next) {

	const {userId}	= request.session
	if (userId) {
		next()
	} else {
		response.sendStatus(401)
	}
}

function verifylogout(request, response, next) {

	const {userId}	= request.session

	if (userId) {
		response.sendStatus(401)
	} else {
		next()
	}
}

function verifyAdmin(request, response, next){
	const {role}	= request.session;
	if ((role & 0o70000) === 0)
	{
		console.log(`user ${request.session.userId} is not an admin ${role}`);
		return response.sendStatus(401);
	}
	next();
}

module.exports = {verifylogin:verifylogin, verifylogout:verifylogout, verifyAdmin:verifyAdmin};
