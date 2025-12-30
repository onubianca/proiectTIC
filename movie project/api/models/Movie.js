import {db} from '../config/firebaseConfig.js';

const moviesCollection = db.collection('movies');

export const Movie = {

    findAll: async (filters = {}) => {  
        let query = moviesCollection;

        if (filters.genre) {
            query = query.where('genres', 'array-contains', filters.genre);
        }

        const snapshot = await query.get();
        return snapshot.docs.map(doc => ({ movieId: doc.id, ...doc.data() }));
    },

    findById: async (movieId) => {
        const doc = await moviesCollection.doc(movieId).get();
        if (!doc.exists) {
            return null;
        }
        return { movieId: doc.id, ...doc.data() };
    },

    create: async (movieData) => {
        const docRef = await moviesCollection.add({
            ...movieData, 
            rating: { average: 0, count: 0 }, 
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString() });
        return docRef.id;
    },

    update: async (movieId, updateData) => {
        await moviesCollection.doc(movieId).update({
            ...updateData, 
            updatedAt: new Date().toISOString() });
        return Movie.findById(movieId);
    },

    delete: async (movieId) => {
        await moviesCollection.doc(movieId).delete();
    }

};