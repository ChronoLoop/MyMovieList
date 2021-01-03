import React from 'react';
import MovieCard from './MovieCard/MovieCard';
import './MovieGrid.scss';
const MovieGrid = ({ movies }) => {
    return (
        <div className="movies-grid mt-3">
            {movies.map((movie) => (
                <MovieCard movie={movie} key={movie._id} />
            ))}
        </div>
    );
};

export default MovieGrid;
