var request = require('request');
var secret = require('../../secrets');
var stationIds = {};	

var retrieveDepartures = function(response, transportType) {
	var answer = {
		departures: []
	};
	var results = response[transportType];
	for (var i in results) {
		var item = results[i];
		answer.departures.push({
			line: item.LineNumber,
			destination: item.Destination,
			time: item.DisplayTime,
			transportType: item.TransportMode,
			blueBus: item.GroupOfLine == 'blåbuss' ? true : false
		});
	}
	return answer
}

var stationId = function(req, res, callback) {
	var place = req.params.station;
	console.log("Requesting station id for '" + place + "'");
	var url = "http://api.sl.se/api2/typeahead.json?key=" + secret.secret.sl.placesApiKey + "&searchstring="+place;
	request(url, function(error, response, body) {
		var result = JSON.parse(body);
		if (result.ResponseData.length > 0) {
			id = result.ResponseData[0].SiteId;
			stationIds[place] = id
			callback(req, res, id);
		} else {
			res.status(404)
		}
	});
}

var stationName = function(req, res, stationId) {
	var slUrl = "http://api.sl.se/api2/realtimedepartures.json?key=" + secret.secret.sl.departuresApiKey + "&siteid=" + stationId + "&timewindow=60";
	request(slUrl, function(error, response, body) {
		console.log('SL answered: ' + response.statusCode);
		var result = JSON.parse(body);
		var transportType = req.params.transportType;
		var answer = retrieveDepartures(result.ResponseData, transportType);
		res.json(answer);
	});
}

var station = function(req, res) {
	var name = req.params.station;
	var id = stationIds[name];
	if (id == null) {
		stationId(req, res, stationName);
	} else {
		stationName(req, res, id);
	}
}

module.exports = {
	station: station
}