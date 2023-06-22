// requires

const express = require('express');
const path = require('path');
const noteRoutes = require('./noteRoute');
const app = express();
// middleware
app.use('/noteRoute', noteRoutes);

//export
module.exports = app;