var weather = require('./weather');
var commute = require('./commute');
var appRouter = function(app) {
	app.get('/weather/home/now', weather.homeNow);
	app.get('/commute/kolonnvagen', commute.kolonnvagen);
	app.get('/commute/solnastation', commute.solnastation);
}

module.exports = appRouter;