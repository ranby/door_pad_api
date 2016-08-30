var weather = require('./weather');
var commute = require('./commute');
var car2go = require('./car2go');
var drivenow = require('./drivenow.js');

var appRouter = function(app) {
	app.get('/weather/:latitude/:longitude', weather.location);
	app.get('/car2go/cars', car2go.cars);
	app.get('/drivenow/cars', drivenow.cars);
	app.get('/commute/:station/:transportType', commute.station);
}

module.exports = appRouter;