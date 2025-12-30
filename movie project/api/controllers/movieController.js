import {validationResult} from 'express-validator';
import {Movie} from '../models/Movie.js';

export async function getMovies(req, res) {
    try {
        const {genre} = req.query;
        const movies = await Movie.findAll({genre});
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies' });
    }
}

export async function getMovieById(req, res) {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch movie' });
    }   
}

export async function createMovie(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const movieId = await Movie.create({
            ...req.body,
            createdBy: req.user.userId
        });
        res.status(201).json({ movieId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating movie' });
    }
    
}

export async function updateMovie(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        const updatedMovie = await Movie.update(req.params.movieId, req.body);
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie' });
    }
}   

export async function deleteMovie(req, res) {
    try {
        const movie = await Movie.findById(req.params.movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await Movie.delete(req.params.movieId);
        res.json({message: 'Movie deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie' });
    }
}

