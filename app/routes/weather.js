var request = require('request');
var moment = require('moment');

var getWeatherDescription = function(num) {
	if (num < 3) 
		return 'sun';
	else if (num < 5)
		return 'cloud-sun';
	else if (num < 8) 
		return 'cloud';
	else if (num === 11 || num === 15)
		return 'snow';
	else 
		return 'rain';
}

var home = function(req, res) {
	var smhiUrlHagalund = "http://opendata-download-metfcst.smhi.se/api/category/pmp2g/version/2/geotype/point/lon/18.01141/lat/59.36251/data.json";
	request(smhiUrlHagalund, function(error, response, body) {
		console.log('SMHI answered: ' + response.statusCode);

		var result = JSON.parse(body);
		var currentHour = new Date().getHours();
		var forecastStartHour = new Date(result.referenceTime).getHours();
		var timeIndex = currentHour - forecastStartHour;

		var wsym = result.timeSeries[timeIndex].parameters[18].values[0];
		

		res.json({
			weather: [
			{
				date: moment(result.timeSeries[timeIndex].validTime).format('YYYY-MM-DD'),
				time: moment(result.timeSeries[timeIndex].validTime).format('H:mm'),
				temp: result.timeSeries[timeIndex].parameters[1].values[0],
				windStr: result.timeSeries[timeIndex].parameters[4].values[0],
				windDir: result.timeSeries[timeIndex].parameters[3].values[0],
				pic: getWeatherDescription(result.timeSeries[timeIndex].parameters[18].values[0])
			},
			{
				date: moment(result.timeSeries[timeIndex+3].validTime).format('YYYY-MM-DD'),
				time: moment(result.timeSeries[timeIndex+3].validTime).format('H:mm'),
				temp: result.timeSeries[timeIndex+3].parameters[1].values[0],
				windStr: result.timeSeries[timeIndex+3].parameters[4].values[0],
				windDir: result.timeSeries[timeIndex+3].parameters[3].values[0],
				pic: getWeatherDescription(result.timeSeries[timeIndex+3].parameters[18].values[0])
			},
			{
				date: moment(result.timeSeries[timeIndex+6].validTime).format('YYYY-MM-DD'),
				time: moment(result.timeSeries[timeIndex+6].validTime).format('H:mm'),
				temp: result.timeSeries[timeIndex+6].parameters[1].values[0],
				windStr: result.timeSeries[timeIndex+6].parameters[4].values[0],
				windDir: result.timeSeries[timeIndex+6].parameters[3].values[0],
				pic: getWeatherDescription(result.timeSeries[timeIndex+6].parameters[18].values[0])
			},
			{
				date: moment(result.timeSeries[timeIndex+9].validTime).format('YYYY-MM-DD'),
				time: moment(result.timeSeries[timeIndex+9].validTime).format('H:mm'),
				temp: result.timeSeries[timeIndex+9].parameters[1].values[0],
				windStr: result.timeSeries[timeIndex+9].parameters[4].values[0],
				windDir: result.timeSeries[timeIndex+9].parameters[3].values[0],
				pic: getWeatherDescription(result.timeSeries[timeIndex+9].parameters[18].values[0])
			}
			]
		});
	});
}

module.exports = {
	home : home
}