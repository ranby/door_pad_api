var request = require('request');
var querystring = require('querystring');
var authToken = null;

var login = function(req, res, callback) {	
	var loginOptions = {
		uri: "https://metrows.drive-now.com/php/drivenowws/v1/user/login?language=sv",
		method: "POST",
		headers: {
			"Content-Type":"application/json",
		},
		form: {
			"user": "erik.ranby@gmail.com",
			"password": "ejans111",
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
			"X-Api-Key":"adf51226795afbc4e7575ccc124face7",
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
				licensePlate: item.licensePlate
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