import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Alert, Row, Col, Image } from 'react-bootstrap';
import './MovieInfo.scss';
//context
import { useAuthContext } from '../../contexts/AuthContext';
//actions
import { getMovieById, deleteMovieById } from '../../actions/Movie';
//utils
import { getMovieImage } from '../../utils/Movie';
//components
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import Loader from '../../components/Loader/Loader';
import MovieRating from '../../components/MovieRating/MovieRating';
import Modal from '../../components/Modal/Modal';

const MovieInfo = () => {
    const { isAdmin } = useAuthContext();
    let { id: movieId } = useParams();
    const history = useHistory();
    //states
    const [hasError, setHasError] = useState(false);
    const [hasAuthError, setHasAuthError] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [movie, setMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMovie = async () => {
            setHasError(false);
            try {
                const res = await getMovieById(movieId);
                const movieData = res.data.movie;
                setMovie({
                    ...movieData,
                    image: getMovieImage(movieData.image.data, movieData.image.contentType),
                    avgRating: movieData.avgRating
                        ? parseFloat(movieData.avgRating.$numberDecimal)
                        : null
                });
            } catch {
                setHasError(true);
            }
            setIsLoading(false);
        };
        fetchMovie();
    }, [movieId]);

    const handleDeleteMovie = async () => {
        if (isAdmin) {
            setHasAuthError(false);
            setShowDeleteModal(true);
        } else {
            setShowDeleteModal(false);
            setHasAuthError(true);
        }
    };

    const deleteMovie = async () => {
        try {
            const res = await deleteMovieById(movieId);
            if (res.status === 204) {
                history.push('/');
            }
        } catch {
            setHasAuthError(true);
        }
    };

    return (
        <ScrollTop>
            <div className="p-5">
                {hasError ? (
                    <Alert variant="danger" onClose={() => setHasError(false)} dismissible>
                        Error: Movie could not be loaded. Please try again at a later time.
                    </Alert>
                ) : null}
                <Modal
                    show={hasAuthError}
                    header={'Error'}
                    message={'Only admins can edit or delete movies.'}
                    onHide={() => setHasAuthError(false)}
                />
                <Modal
                    show={showDeleteModal}
                    header={'Delete Confirmation'}
                    message={'Are you sure you want to delete this movie?'}
                    onHide={() => setShowDeleteModal(false)}
                    onConfirm={() => deleteMovie()}
                />

                {isLoading ? (
                    <Loader />
                ) : movie ? (
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
                                    <MovieRating rating={movie.avgRating} center={true} />
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
                                <Button variant="danger" onClick={handleDeleteMovie}>
                                    Delete Movie
                                </Button>
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
                                    <MovieRating rating={movie.avgRating} center={false} />
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
                ) : null}
            </div>
        </ScrollTop>
    );
};

export default MovieInfo;
