import React from 'react';
import { useHistory } from 'react-router-dom';
import './MovieCard.scss';
import { Button } from 'react-bootstrap';
//utils
import { getMovieImage } from '../../../utils/Movie';

const MovieCard = ({ movie }) => {
    const movieImage = getMovieImage(movie.image.data, movie.image.contentType);
    const history = useHistory();
    const handleMoreInfo = () => {
        history.push(`/movies/${movie._id}`);
    };
    return (
        <div className="card-container">
            <img src={movieImage} alt="movie" />
            <div className="info">
                <h2>{movie.title}</h2>
                <p>{`${movie.movieLength.hours} h ${movie.movieLength.minutes} m / ${movie.genre}`}</p>
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
