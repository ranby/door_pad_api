var request = require('request');
var secret = require('../../secrets.js');
var authToken = null;

var login = function(req, res, callback) {	
	var loginOptions = {
		uri: "https://metrows.drive-now.com/php/drivenowws/v1/user/login?language=sv",
		method: "POST",
		headers: {
			"Content-Type":"application/json",
		},
		form: {
			"user": secret.secret.driveNow.username,
			"password": secret.secret.driveNow.password,
			"current_tenant": "SE"
		}
	};
	request(loginOptions, function(error, response, body) {
		console.log("DriveNow login answered: " + response.statusCode);
		var result = JSON.parse(body);
		authToken = result.auth;
		callback(req, res);
	});
}

var getCars = function(req, res) {
	requestOption = {
		uri: "https://api2.drive-now.com/cities/42128?expand=full",
		method: "GET",
		headers: {
			"X-Api-Key": secret.secret.driveNow.apiKey,
			"X-Auth-Token":authToken,
			"X-language":"sv"
		}
	}
	request(requestOption, function(error, response, body) {
		console.log("DriveNow getCar answered: " + response.statusCode);
		if (response.statusCode !== 200) {
			authToken = null;
			tryGetCars(req, res);
		}
		result = JSON.parse(body);
		answer = {
			cars: []
		};
		for (var i in result.cars.items) {
			var item = result.cars.items[i];
			answer.cars.push({
				id: item.id,
				lng: item.longitude,
				lat: item.latitude,
				address: null,
				fuel: item.fuelLevelInPercent,
				licensePlate: item.licensePlate,
				model: item.modelName
			});
		}
		res.json(answer);
	});
}

var tryGetCars = function(req, res) {
	if (authToken == null) {
		login(req, res, getCars);
	} else {
		getCars(req, res);
	}
}

module.exports = {
	cars: tryGetCars
}