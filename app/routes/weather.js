var request = require('request');
var moment = require('moment');

var homeNow = function(req, res) {
	var smhiUrlHagalund = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.01141/lat/59.36251/data.json";
	request(smhiUrlHagalund, function(error, response, body) {
		console.log('SMHI answered: ' + response.statusCode);

		var result = JSON.parse(body);
		var currentHour = new Date().getHours();
		var forecastStartHour = new Date(result.referenceTime).getHours();
		var timeIndex = currentHour - forecastStartHour;

		var wsym = result.timeSeries[timeIndex].parameters[18].values[0];
		var wtext = '';
		if (wsym < 3) 
			wtext = 'sun';
		else if (wsym < 5)
			wtext = 'cloud-sun';
		else if (wsym < 8) 
			wtext = 'cloud';
		else if (wsym === 11 || wsym === 15)
			wtext = 'snow'
		else 
			wtext = 'rain'

		res.json({
			time: moment(result.timeSeries[timeIndex].validTime).format('YYYY-MM-DD H:mm'),
			temp: result.timeSeries[timeIndex].parameters[1].values[0],
			wind: result.timeSeries[timeIndex].parameters[4].values[0],
			pic: wtext
		});
	});
}

module.exports = {
	homeNow : homeNow
}