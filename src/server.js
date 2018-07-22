const path = require('path');
const bodyParser = require('body-parser');
const	express = require('express');
const mongoose = require('mongoose');

const config = require('./config');
const router = require('./routes');

// mongodb connection
mongoose.connect("mongodb://test:password1@ds247698.mlab.com:47698/smileypage", {useNewUrlParser: true})
var db = mongoose.connection
// mongo error 
db.on('error', console.error.bind(console, 'connection error:'))

// create application object 
const app = express();

// serve public files (index.html is default)
const publicPath = path.resolve(__dirname, '../public');
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use('/api', router);


app.listen(config.port, function () {
	console.log(`${config.appName} is listening on port ${config.port}`);
}) 