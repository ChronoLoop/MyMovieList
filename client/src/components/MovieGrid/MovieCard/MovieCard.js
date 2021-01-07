import React from 'react';
import { useHistory } from 'react-router-dom';
import './MovieCard.scss';
import { Button } from 'react-bootstrap';
//utils
import { getMovieImage } from '../../../utils/Movie';
import { FaStar } from 'react-icons/fa';

const MovieCard = ({ movie }) => {
    const movieImage = getMovieImage(movie.image.data, movie.image.contentType);
    const history = useHistory();
    const handleMoreInfo = () => {
        history.push(`/movies/${movie._id}`);
    };
    return (
        <div className="card-container">
            <img src={movieImage} alt="movie" />
            <div className="info w-100">
                <h2 className="m-0">{movie.title}</h2>
                <hr />
                <div className="mb-1">{`${movie.movieLength.hours}h ${movie.movieLength.minutes}m / ${movie.genre}`}</div>
                <div className="mb-3">{`Rating: ${
                    movie.avgRating ? parseFloat(movie.avgRating).toFixed(2) : 'N/A'
                }`}</div>
                <Button variant="primary" className="mr-2" onClick={handleMoreInfo}>
                    More Info
                </Button>
                <Button variant="secondary" href={`${movie.trailerLink}`} target="_blank">
                    Trailer
                </Button>
            </div>
        </div>
    );
};

export default MovieCard;
