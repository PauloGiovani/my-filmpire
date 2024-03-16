import { useState, useEffect } from 'react';

import './App.css';
import MovieCard from './MovieCard';
import SearchIcon from './search.svg';

// Link 1: https://www.youtube.com/watch?v=b9eMGE7QtTk&t=2318s
// Link 2: https://filmpire.netlify.app/
// Gist: https://gist.github.com/adrianhajdin/997a8cdf94234e889fa47be89a4759f1
// 2e6f553c

// OMDb API URL
const API_URL = 'http://www.omdbapi.com?apikey=2e6f553c';

const movie1 = {
    "Title": "Amazing Spiderman Syndrome",
    "Year": "2012",
    "imdbID": "tt2586634",
    "Type": "movie",
    "Poster": "N/A"
};

function App() {

    // Use state for set a movie
    const [movies, setMovies] = useState([]);

    // Use state for set a movie when user search something
    const [searchTerm, setSearchTerm] = useState('');

    // Search movie by title
    const searchMovies = async(title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    };

    // Fetch OMDb movies when the page is loaded
    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    // Render the App
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input 
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img 
                    src={SearchIcon} 
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {
                // Check if there's some movie to render
                movies?.length > 0 ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }

        </div>
    );
}

export default App;
