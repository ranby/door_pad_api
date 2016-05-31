var weather = require('./weather');
var commute = require('./commute');
var car2go = require('./car2go');

var appRouter = function(app) {
	app.get('/weather/home', weather.home);
	app.get('/commute/kolonnvagen', commute.kolonnvagen);
	app.get('/commute/solnastation', commute.solnastation);
	app.get('/car2go/cars', car2go.cars);
}

module.exports = appRouter;