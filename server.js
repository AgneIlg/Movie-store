const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3006;

app.use(bodyParser.json());

let movies = [];
let currentId = 1;

// CREATE a new movie
app.post('/movies', (req, res) => {
    const { title, productionDate, producer, rating } = req.body;
    const newMovie = { id: currentId++, title, productionDate, producer, rating };
    movies.push(newMovie);
    res.status(201).json(newMovie);
});


// READ all movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// READ a movie by ID
app.get('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id, 10); 
    const movie = movies.find(m => m.id === movieId);
    if (movie) {
        res.status(201).json(movie);
    } else {
    res.status(404).send('Movie not found');
    }
});


app.put('/movies/:id', (req, res) => {
    const movieId = +req.params.id;
    const { rating } = req.body;
    const movieIndex = movies.findIndex(index => index.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }else{ movies[movieIndex].rating = rating;
    res.json(movies[movieIndex]);
  }});

// DELETE a movie by ID
app.delete('/movies/:id', (req, res) => {
    const movieId = parseInt(req.params.id, 10);
    const movieIndex = movies.findIndex(m => m.id === movieId);
    if (movieIndex !== -1) {
        movies.splice(movieIndex, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Movie not found');
    }
});


app.listen(port, () => {
    console.log(`Movie store API is listening on http://localhost:${port}`);
});
