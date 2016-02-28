var express = require('express');
var app = express();
var path = require('path');
var Forecast = require('forecast.io'),
	util = require('util');
	qs = require('querystring');

var options = {
  APIKey: "322b5af02f4e94ccbe69bf7b9b80687e",
  timeout: 1000
},
forecast = new Forecast(options);

app.set('view engine','jade');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/graph', function (req, res) {
	var lat = parseFloat(req.param('lat'));
	var lng = parseFloat(req.param('lng'));
	// res.render('graph', { locals: { data : {name : 'stephen'} } });
	getData(lat, lng, res);
});

app.listen(8000, function () {
  console.log('App listening on port 8000!');
});


function getData(latitude, longitude, response) {
	forecast.get(latitude, longitude, function (err, res, data) {
	  if (err) throw err;
	  datapoints = data["daily"]["data"];
	  var arr = processData(datapoints);
	  response.render('graph', { data : arr });
	});
}

function processData(datapoints) {
	var arr = [];
	for (var i = 0; i < datapoints.length; i++) {
		var datapoint = datapoints[i];
		var sec = datapoint["time"];
		var min = datapoint["temperatureMin"];
		var max = datapoint["temperatureMax"];
		var wind = datapoint["windSpeed"];
		var sum = datapoint["summary"];
		arr.push([sec, min, max, wind, sum]);
	}
	return arr;
}