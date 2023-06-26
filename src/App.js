import { useState, useEffect } from "react";

import MovieCard from './MovieCard';

import './App.css';
import SearchIcon from './search.svg';

const API_URL = "http://www.omdbapi.com?apikey=a65c51bc&";

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            //Get input value when pressing enter to search for titles
            searchMovies(searchTerm);

        } else if (event.key !== 'Enter') {
            return null;
        }
    }

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {
        searchMovies('Marvel');
    }, []);
    return (
        <div className="app">
            <h1>Movies Galore</h1>
            <h3>A wide variety of movie posters available with a simple search.</h3>

            <div className="search">
                <input id="search"
                    placeholder="Search for movie titles"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <img
                    src={SearchIcon}
                    alt="search"
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>

            {movies?.length > 0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )}
        </div>
    );
}

export default App;