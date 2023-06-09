const express = require('express');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3001;
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



//routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


//get note route
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
            res.status(500).json({ error: 'Failed to get notes' });
        }
        else {
            const newNote = JSON.parse(data);
            return res.json(newNote);
        }
    });
});


//post route for adding new notes

app.post('/api/notes', (req, res) => {
    const { title, text} = req.body;
    const note = { title, text, id: uuidv4() };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        }
        else {
            const newnote = JSON.parse(data);
            newnote.push(note);
        
            fs.writeFile('./db/db.json', JSON.stringify(newnote), (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('note added');
                    res.json(newnote);
                }
            });
        };
    });
});


//delete route for deleting notes

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id;

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        }

        else {
            const note = JSON.parse(data);
            const filterNote = note.filter((note) => note.id !== id);

            fs.writeFile('./db/db.json', JSON.stringify(filterNote), (err) => {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log('note deleted');
                    res.json(filterNote);
                }
            });
        }
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// listening
app.listen(PORT, () => {
    console.log(`server now on port ${PORT}!`);
});