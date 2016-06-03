var request = require('request');
var authToken = null;

var login = function(req, res) {
	url = "https://metrows.drive-now.com/php/drivenowws/v1/user/login?language=sv";
	request.post(url, {"user":"erik.ranby@gmail.com","password":"ejans111","current_tenant":"SE"}, function(error, response, body) {
		console.log("DriveNow login answered: " + response.statusCode);
		var result = JSON.parse(body);
		authToken = result.auth;
	});
}

var getCars = function(req, res) {
	// url = "https://api2.drive-now.com/cities/42128?expand=full";
	// request({
	// 	uri: url,

	// })
}

module.exports = {
	login: login,
	cars: getCars
}