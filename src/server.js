const path = require('path');
const	express = require('express');
const config = require('./config');
const mongoose = require('mongoose');

// create application object 
const app = express();

// serve public files (index.html is default)
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));


app.listen(config.port, function () {
	console.log(`${config.appName} is listening on port ${config.port}`);
});