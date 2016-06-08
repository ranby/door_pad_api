var request = require('request');
var secret = require('../../secrets.js');

var getCars = function(req, res) {
	url = "http://www.car2go.com/api/v2.1/vehicles?loc=stockholm&oauth_consumer_key=" + secret.secret.car2go.consumerKey + "&format=json";
	request(url, function(error, response, body) {
		console.log("Car2go answered: " + response.statusCode)
		var result = JSON.parse(body);
		var answer = {
			cars: []
		}
		for (var i in result.placemarks) {
			var item = result.placemarks[i];
			answer.cars.push({
				id: item.vin,
				lng: item.coordinates[0],
				lat: item.coordinates[1],
				address: item.address,
				fuel: item.fuel,
				licensePlate: item.name,
			});
		}
		res.json(answer);
	});
}

module.exports = {
	cars: getCars
}