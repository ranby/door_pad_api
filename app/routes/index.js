var weather = require('./weather');
var commute = require('./commute');
var appRouter = function(app) {
	app.get('/weather/home', weather.home);
	app.get('/commute/kolonnvagen', commute.kolonnvagen);
	app.get('/commute/solnastation', commute.solnastation);
}

module.exports = appRouter;