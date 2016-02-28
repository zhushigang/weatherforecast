var Forecast = require('forecast.io'),
	util = require('util');
	qs = require('querystring');

var options = {
  APIKey: "322b5af02f4e94ccbe69bf7b9b80687e",
  timeout: 1000
},
forecast = new Forecast(options);
var latitude = 41.8882354, longitude = -87.63074519999998;

getData(latitude, longitude);


function getData(latitude, longitude) {
	forecast.get(latitude, longitude, function (err, res, data) {
	  if (err) throw err;
	  processData(data);
	});
}

function processData(data) {
	console.log(data["daily"]["data"]);
}