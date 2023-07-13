const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname));

app.use('/',routes);

module.exports = app;