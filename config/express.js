const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');



module.exports = (app, config) => {

    // This set up which is the parser for the request's data.
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    //create a cors middleware
    app.use(cors());

    // This makes the content in the "public" folder accessible for every user.
    app.use(express.static(path.join(config.rootFolder, 'public')));
};