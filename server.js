const express = require('express');
const config = require('./config/config');
const app = express();
const env = require('./util/variables').environment;

require('./config/express')(app, config[env]);
require('./config/routes')(app);

// Initialize REST API
require('./util/api').initialize();

module.exports = app;