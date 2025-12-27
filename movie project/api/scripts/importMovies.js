import fs from 'fs';
import path from 'path';
import { db } from '../config/firebaseConfig.js';

async function importMovies() {
    try {
        const filePath = path.join('data', 'movies.json');
        const data = fs.readFileSync(filePath, 'utf-8');
        const json = JSON.parse(data);
        const movies = json.movies;

        const batch = db.batch();
        const col = db.collection('movies');

        movies.forEach((movie) => {
            const docRef = col.doc(); 
            const actors = movie.actors ? movie.actors.split(',').map(actor => ({name: actor.trim()})) : [];
            batch.set(docRef, {
                title: movie.title,
                year: Number(movie.year),
                runtime: Number(movie.runtime),
                genres: movie.genres,
                director: movie.director,
                actors,
                description: movie.plot,
                posterUrl: movie.posterUrl,
                rating: { average: 0, count: 0 },
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              });
        });

        await batch.commit();
        console.log('Movies imported successfully');
    }
    catch (error) {
        console.error('Error importing movies:', error);
    }
}

importMovies(); 

