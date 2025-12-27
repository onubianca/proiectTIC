async function fetchMovies() {
    try {
        const res = await fetch('http://localhost:3000/movies');
        const data = await res.json();

        const container = document.getElementById('movie-container');
        container.innerHTML = '';

        data.movies.forEach(movie => {  
            const movieCard = document.createElement('div');
            movieCard.className = 'movie-card';
            movieCard.innerHTML = `
                <img src="${movie.posterUrl}" alt="${movie.title} Poster" class="movie-poster"/>
                <div class="movie-details"> 
                    <h2 class="movie-title">${movie.title} (${movie.year})</h2>
                    <p class="movie-genres">${movie.genres.join(', ')}</p>
                    <p class="movie-director"><strong>Director:</strong> ${movie.director}</p>
                    <p class="movie-actors"><strong>Actors:</strong> ${movie.actors.map(actor => actor.name).join(', ')}</p>
                    <p class="movie-description">${movie.description}</p>
                </div>
            `;
            container.appendChild(movieCard);

        });
    }
    catch (error) {
        console.error('Error fetching movies:', error);
    }
        
}
 

 fetchMovies(); 