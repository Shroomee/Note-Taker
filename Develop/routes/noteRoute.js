//requires
const express = require('express');
const path = require('path');
const fs = require('fs');
const noteRoute = require('express').Router();


//set up express app
const app = express();


//get note route
noteRoute.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to get notes' });
        } else {
            res.json(JSON.parse(data));
    }
    });
});

//post route for adding new notes