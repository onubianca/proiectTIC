import express from 'express';
import {validateToken} from '../middleware/auth.js';
import * as movieController from '../controllers/movieController.js';
import {movieValidator} from '../validators/movieValidator.js';

const router = express.Router();

router.get('/', movieController.getMovies);
router.get('/:movieId', movieController.getMovieById);
router.post('/', validateToken, movieValidator, movieController.createMovie);
router.put('/:movieId', validateToken, movieValidator, movieController.updateMovie);
router.delete('/:movieId', validateToken, movieController.deleteMovie);

export default router;