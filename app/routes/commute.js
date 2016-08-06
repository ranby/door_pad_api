var request = require('request');
var secret = require('../../secrets');

var rokubbsgatan = function(req, res) {
	var slUrl = "http://api.sl.se/api2/realtimedepartures.json?key=" + secret.secret.sl.apiKey + "&siteid=1140&timewindow=60";
	request(slUrl, function(error, response, body) {
		console.log('SL (Rökubbsgatan) answered: ' + response.statusCode);

		var result = JSON.parse(body);

		var answer = {
			departures: []
		};
		for (var i in result.ResponseData.Buses) {
			var item = result.ResponseData.Buses[i];
			var type = item.GroupOfLine == 'blåbuss' ? 'BLUE BUS' : 'BUS';
			answer.departures.push({
				line: item.LineNumber,
				destination: item.Destination,
				time: item.DisplayTime,
				transportType: type
			});
		}
		res.json(answer);
	});
}

var gardet = function(req, res) {
	var slUrl = "http://api.sl.se/api2/realtimedepartures.json?key=" + secret.secret.sl.apiKey + "&siteid=9221&timewindow=60";
	request(slUrl, function(error, response, body) {
		console.log('SL (Gärdet) answered: ' + response.statusCode);

		var result = JSON.parse(body);
		console.log(result);

		var answer = {
			departures: []
		};
		for (var i in result.ResponseData.Metros) {
			var item = result.ResponseData.Metros[i];
			answer.departures.push({
				line: item.LineNumber,
				destination: item.Destination,
				time: item.DisplayTime,
				transportType: 'TRAIN'
			});
		}
		res.json(answer);
	});
}

module.exports = {
	rokubbsgatan: rokubbsgatan,
	gardet: gardet
}