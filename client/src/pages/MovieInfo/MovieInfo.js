import React, { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, Alert, Row, Col, Image, Container } from 'react-bootstrap';
import { MdRateReview } from 'react-icons/md';
import './MovieInfo.scss';
//context
import { useAuthContext } from '../../contexts/AuthContext';
import { useMovieInfoContext, MOVIE_INFO_ACTIONS } from '../../contexts/MovieInfoContext';
//actions
import { getMovieById, deleteMovieById } from '../../actions/Movie';
//utils
import { getMovieImage } from '../../utils/Movie';
//components
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import Loader from '../../components/Loader/Loader';
import MovieRating from '../../components/MovieRating/MovieRating';
import Modal from '../../components/Modal/Modal';
import TextArea from '../../components/TextArea/TextArea';

const MovieInfo = () => {
    //router
    let { id: movieId } = useParams();
    const history = useHistory();
    //context
    const { isAdmin, isAuth } = useAuthContext();
    const { state, dispatch } = useMovieInfoContext();
    const { movie } = state;
    useEffect(() => {
        const fetchMovie = async () => {
            dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_START });
            try {
                const res = await getMovieById(movieId);
                let movieData = res.data.movie;
                //get image url and parse average rating to float
                movieData = {
                    ...movieData,
                    image: getMovieImage(movieData.image.data, movieData.image.contentType),
                    avgRating: movieData.avgRating
                        ? parseFloat(movieData.avgRating).toFixed(2)
                        : null
                };
                dispatch({
                    type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_SUCCESS,
                    payload: { movie: movieData }
                });
            } catch {
                dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_FETCH_FAILURE });
            }
        };
        fetchMovie();
    }, [movieId, dispatch]);

    const handleEditMovie = () => {
        if (isAdmin) {
            dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_EDIT_START });
        } else {
            dispatch({ type: MOVIE_INFO_ACTIONS.OPEN_ADMIN_ERROR });
        }
    };

    const handleDeleteMovie = () => {
        if (isAdmin) {
            dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_DELETE_START });
        } else {
            dispatch({ type: MOVIE_INFO_ACTIONS.OPEN_ADMIN_ERROR });
        }
    };

    const handleReview = (e) => {
        dispatch({ type: MOVIE_INFO_ACTIONS, payload: { review: e.target.value } });
    };

    const deleteMovie = async () => {
        try {
            const res = await deleteMovieById(movieId);
            if (res.status === 204) {
                dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_DELETE_SUCCESS });
                history.push('/');
            }
        } catch {
            dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_DELETE_FAILURE });
        }
    };

    return (
        <ScrollTop>
            <Container className="p-3 my-3">
                <Alert variant="danger" show={state.fetchMovieFailure}>
                    Error: Movie could not be loaded. Please try again at a later time.
                </Alert>
                <Modal
                    show={state.hasAdminError}
                    header={'Error'}
                    message={'Only admins can edit or delete movies.'}
                    onHide={() => dispatch({ type: MOVIE_INFO_ACTIONS.CLOSE_ADMIN_ERROR })}
                />
                <Modal
                    show={state.showDeleteModal}
                    header={'Delete Confirmation'}
                    message={'Are you sure you want to delete this movie?'}
                    onHide={() => dispatch({ type: MOVIE_INFO_ACTIONS.MOVIE_DELETE_END })}
                    onConfirm={() => deleteMovie()}
                />
                {state.isLoadingMovie ? <h1>Loading Movie...</h1> : null}

                {state.isLoadingMovie ? (
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
                                <Button
                                    variant="primary"
                                    className="mr-3"
                                    onClick={handleEditMovie}
                                >
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
            </Container>
            <hr className="movie-info" />
            <Container className="p-3">
                <h1 className="text-center">Reviews</h1>
                <div className="user-review-container mt-3">
                    <Alert variant="info" dismissible>
                        Must be signed in to add a review or rate the movie.
                    </Alert>
                    <TextArea
                        name="description"
                        type="text"
                        min={0}
                        rows={2}
                        onChange={handleReview}
                        Icon={MdRateReview}
                        placeholder="Add a public review..."
                        className="mb-1"
                    />
                    <div className="d-flex justify-content-end">
                        <Button variant="danger">Post</Button>
                    </div>
                </div>
                <Loader />
            </Container>
        </ScrollTop>
    );
};

export default MovieInfo;
