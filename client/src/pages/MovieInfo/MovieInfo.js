import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Alert, Row, Col, Image } from 'react-bootstrap';
import './MovieInfo.scss';
//actions
import { getMovieById } from '../../actions/Movie';
//utils
import { getMovieImage } from '../../utils/Movie';
//components
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import Loader from '../../components/Loader/Loader';

const MovieInfo = () => {
    let { id } = useParams();
    const [hasError, setHasError] = useState(false);
    const [hasAuthError, setHasAuthError] = useState(false);
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setHasError(false);
            try {
                const res = await getMovieById(id);
                const movieData = res.data.movie;
                setMovie({
                    ...movieData,
                    image: getMovieImage(movieData.image.data, movieData.image.contentType)
                });
            } catch (err) {
                setHasError(true);
            }
            setIsLoading(false);
        };
        fetchMovie();
    }, [id]);

    return (
        <ScrollTop>
            <div className="p-5">
                {hasAuthError ? (
                    <Alert variant="danger">Only admins can edit or delete movies.</Alert>
                ) : null}
                {hasError ? (
                    <Alert variant="danger">
                        Error: Movie could not be loaded. Please try again at a later time.
                    </Alert>
                ) : null}
                {isLoading ? (
                    <Loader />
                ) : (
                    <Row>
                        <Col sm={12} xl={3} className="text-center mb-4 mb-xl-0">
                            <div className="d-block d-xl-none text-center text-xl-left mb-4">
                                <h1>{movie.title}</h1>
                                <div className="subtext">
                                    {movie.genre}
                                    <span className="ghost">|</span>
                                    <time>
                                        {movie.movieLength.hours +
                                            'h ' +
                                            movie.movieLength.minutes +
                                            'm'}
                                    </time>
                                </div>
                            </div>
                            <Image
                                fluid
                                src={movie.image}
                                alt="movie"
                                className="movie-info-image"
                            />
                            <div className="mt-1">
                                <Button variant="primary" className="mr-3">
                                    Edit Movie
                                </Button>
                                <Button variant="danger">Delete Movie</Button>
                            </div>
                        </Col>
                        <Col sm={12} xl={9}>
                            <div className="d-none d-xl-block text-center text-xl-left mb-4">
                                <h1>{movie.title}</h1>
                                <div className="subtext">
                                    {movie.genre}
                                    <span className="ghost">|</span>
                                    <time>
                                        {movie.movieLength.hours +
                                            'h ' +
                                            movie.movieLength.minutes +
                                            'm'}
                                    </time>
                                </div>
                            </div>
                            <div className="description">
                                <p>{movie.description}</p>
                                <p>
                                    Watch the trailer{' '}
                                    <a href={movie.trailerLink} target="_blank" rel="noreferrer">
                                        {' '}
                                        here
                                    </a>
                                    .
                                </p>
                            </div>
                        </Col>
                    </Row>
                )}
            </div>
        </ScrollTop>
    );
};

export default MovieInfo;
