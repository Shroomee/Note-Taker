//requires
const express = require('express');
const path = require('path');
const fs = require('fs');
const e = require('express');
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
// still need to setup id in the note const 
noteRoute.post('/api/notes', (req, res) => {
    const { title, text } = req.body;
    const note = { title, text, id: tba };

    fs.readFile('../db/db.json', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to get notes' });
        } else {
            const notes = JSON.parse(data);
            notes.push(note);

            fs.writeFile('../db/db.json', JSON.stringify(notes), (err) => {
                if (err) {
                    console.log(err)
                    res.status(500).json({ error: 'Failed to post notes' });
                } else {
                    console.log('note added');
                    res.json(note);
                }
            });
        }
    });
});