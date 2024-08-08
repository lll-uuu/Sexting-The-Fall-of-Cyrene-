const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/images/list', (req, res) => {
    fs.readdir(path.join(__dirname, 'public/images/float'), (err, files) => {
        if (err) {
            res.status(500).send('Error reading float images directory');
            return;
        }
        res.json(files);
    });
});

app.get('/images/text', (req, res) => {
    fs.readdir(path.join(__dirname, 'public/images/text'), (err, files) => {
        if (err) {
            res.status(500).send('Error reading text images directory');
            return;
        }
        res.json(files);
    });
});

app.get('/images/circle', (req, res) => {
    fs.readdir(path.join(__dirname, 'public/images/circle'), (err, files) => {
        if (err) {
            res.status(500).send('Error reading circle images directory');
            return;
        }
        res.json(files);
    });
});

app.get('/images/background', (req, res) => {
    fs.readdir(path.join(__dirname, 'public/images/background'), (err, files) => {
        if (err) {
            res.status(500).send('Error reading background images directory');
            return;
        }
        res.json(files);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
