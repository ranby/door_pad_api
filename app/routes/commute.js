var request = require('request');

var kolonnvagen = function(req, res) {
	var slUrl = "http://api.sl.se/api2/realtimedepartures.json?key=afc1763d6441487799a1f516851632cc&siteid=3456&timewindow=60";
	request(slUrl, function(error, response, body) {
		console.log('SL (Kolonnvägen) answered: ' + response.statusCode);

		var result = JSON.parse(body);

		var answer = {
			departures: []
		};
		for (var i in result.ResponseData.Buses) {
			var item = result.ResponseData.Buses[i];
			answer.departures.push({
				line: item.LineNumber,
				destination: item.Destination,
				time: item.DisplayTime
			});
		}
		res.json(answer);
	});
}

var solnastation = function(req, res) {
	var slUrl = "http://api.sl.se/api2/realtimedepartures.json?key=afc1763d6441487799a1f516851632cc&siteid=9509&timewindow=60";
	request(slUrl, function(error, response, body) {
		console.log('SL (Solna Station) answered: ' + response.statusCode);

		var result = JSON.parse(body);

		var answer = {
			departures: []
		};
		for (var i in result.ResponseData.Trains) {
			var item = result.ResponseData.Trains[i];
			answer.departures.push({
				line: item.LineNumber,
				destination: item.Destination,
				time: item.DisplayTime
			});
		}
		res.json(answer);
	});
}

module.exports = {
	kolonnvagen: kolonnvagen,
	solnastation: solnastation
}