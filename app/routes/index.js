var weather = require('./weather');
var appRouter = function(app) {
	app.get('/weather/home/now', weather.homeNow);
}

module.exports = appRouter;