import React, { useReducer, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Alert, Button, Container } from 'react-bootstrap';
import { MdRateReview } from 'react-icons/md';
//api
import { getMovieReviews, getCurrentUserReview, addReview } from '../../../api/Review';
import { getMovieAverageById } from '../../../api/Movie';
//contexts
import { useAuthContext } from '../../../contexts/AuthContext';
import { MOVIE_INFO_ACTIONS, useMovieInfoContext } from '../../../contexts/MovieInfoContext';
//components
import Loader from '../../../components/Loader/Loader';
import TextArea from '../../../components/TextArea/TextArea';
import UserRating from '../../../components/UserRating/UserRating';
import UserReviews from '../../../components/UserReviews/UserReviews';

const MOVIE_REVIEW_ACTIONS = {
    SET_REVIEW: 'set-review',
    SET_RATING: 'set-rating',
    MOVIE_REVIEWS_FETCH_START: 'movies-reviews-fetch-start',
    MOVIE_REVIEWS_FETCH_SUCCESS: 'movies-reviews-fetch-success',
    MOVIE_REVIEWS_FETCH_FAILURE: 'movies-reviews-fetch-failure',
    OPEN_REVIEW_AUTH_ERROR: 'open-review-auth-error',
    USER_REVIEW_FETCH_START: 'user-review-fetch-start',
    USER_REVIEW_FETCH_SUCCESS: 'user-review-fetch-success',
    USER_REVIEW_FETCH_FAILURE: 'user-review-fetch-failure',
    USER_REVIEW_POST_START: 'user-review-post-start',
    USER_REVIEW_POST_SUCCESS: 'user-review-post-success',
    USER_REVIEW_POST_FAILURE: 'user-review-post-failure',
    CLOSE_INFO_MESSSAGE: 'close-info-message',
    CLOSE_ERROR_MESSAGE: 'close-error-message'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_REVIEW_ACTIONS.SET_REVIEW:
            return {
                ...state,
                review: action.payload.review
            };
        case MOVIE_REVIEW_ACTIONS.SET_RATING:
            return {
                ...state,
                rating: action.payload.rating
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_START:
            return {
                ...state,
                isLoadingMovieReviews: true
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_SUCCESS:
            return {
                ...state,
                isLoadingMovieReviews: false,
                movieReviews: action.payload.movieReviews
            };
        case MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_FAILURE:
            return {
                ...state,
                isLoadingMovieReviews: false,
                errorMsg:
                    'Movie reviews could no be loaded. Please refresh the page or try again later.',
                showError: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_START:
            return {
                ...state,
                isLoadingUserReview: true,
                userReviewExists: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_SUCCESS:
            return {
                ...state,
                isLoadingUserReview: false,
                review: action.payload.review,
                rating: action.payload.rating,
                userReviewExists: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_FAILURE:
            return {
                ...state,
                isLoadingUserReview: false,
                review: '',
                rating: null,
                userReviewExists: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_START:
            return {
                ...state,
                isSubmitting: true
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_SUCCESS:
            return {
                ...state,
                infoMsg: 'Review was successfully posted or updated.',
                showInfo: true,
                isSubmitting: false
            };
        case MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_FAILURE:
            return {
                ...state,
                errorMsg: 'Review could not be posted. Please try again at a later time.',
                showError: true,
                isSubmitting: false
            };
        case MOVIE_REVIEW_ACTIONS.OPEN_REVIEW_AUTH_ERROR:
            return {
                ...state,
                infoMsg: 'Must be signed in to add a review or rate the movie.',
                showInfo: true
            };
        case MOVIE_REVIEW_ACTIONS.CLOSE_INFO_MESSSAGE:
            return {
                ...state,
                infoMsg: null,
                showInfo: false
            };
        case MOVIE_REVIEW_ACTIONS.CLOSE_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg: null,
                showError: false
            };
        default:
            return state;
    }
};

const initialState = {
    movieReviews: [],
    review: '',
    rating: null,
    userReviewExists: false,
    isLoadingUserReview: true,
    isLoadingMovieReviews: true,
    isSubmitting: false,
    showError: false,
    showInfo: false,
    errorMsg: '',
    infoMsg: ''
};

const MovieReviews = () => {
    const [reviewState, reviewDispatch] = useReducer(reducer, initialState);
    const { isAuth } = useAuthContext();
    const { state: movieInfoState, dispatch: movieInfoDispatch } = useMovieInfoContext();
    const { isLoadingMovie, fetchMovieFailure } = movieInfoState;
    let { id: movieId } = useParams();

    //used to refetech rating and reviews after submitting review
    const refetchData = async () => {
        //refetch movie reviews
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_START
        });
        const movieReviewsRes = await getMovieReviews(movieId);
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_SUCCESS,
            payload: { movieReviews: movieReviewsRes.data.movieReviews }
        });
        //refetch movie avg rating
        const avgRatingRes = await getMovieAverageById(movieId);
        movieInfoDispatch({
            type: MOVIE_INFO_ACTIONS.UPDATE_AVERAGE_RATING,
            payload: {
                avgRating: avgRatingRes.data.avgRating
                    ? parseFloat(avgRatingRes.data.avgRating).toFixed(2)
                    : null
            }
        });
    };

    //movie reviews
    useEffect(() => {
        const fetchMovieReviews = async () => {
            try {
                reviewDispatch({
                    type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_START
                });
                const res = await getMovieReviews(movieId);
                reviewDispatch({
                    type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_SUCCESS,
                    payload: { movieReviews: res.data.movieReviews }
                });
            } catch {
                reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.MOVIE_REVIEWS_FETCH_FAILURE });
            }
        };
        fetchMovieReviews();
    }, [movieId]);

    //user review
    useEffect(() => {
        const fetchCurrentUserReview = async () => {
            try {
                reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_START });
                const res = await getCurrentUserReview(movieId);
                reviewDispatch({
                    type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_SUCCESS,
                    payload: {
                        review: res.data.userReview.review,
                        rating: res.data.userReview.rating
                    }
                });
            } catch {
                reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_FETCH_FAILURE });
            }
        };
        //fetch if signed in
        if (isAuth) fetchCurrentUserReview();
    }, [movieId, isAuth]);

    const handleReview = (e) => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.SET_REVIEW,
            payload: { review: e.target.value }
        });
    };

    const handleRating = (e) => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.SET_RATING,
            payload: { rating: e.target.value }
        });
    };

    const handleSubmit = async () => {
        if (isAuth) {
            try {
                reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_START });
                const res = await addReview(movieId, reviewState.rating, reviewState.review);
                if (res.status === 201) {
                    reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_SUCCESS });
                    await refetchData();
                }
            } catch {
                reviewDispatch({
                    type: MOVIE_REVIEW_ACTIONS.USER_REVIEW_POST_FAILURE
                });
            }
        } else {
            reviewDispatch({ type: MOVIE_REVIEW_ACTIONS.OPEN_REVIEW_AUTH_ERROR });
        }
    };

    //alert handlers
    const closeErrorAlert = () => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.CLOSE_ERROR_MESSAGE
        });
    };
    const closeInfoAlert = () => {
        reviewDispatch({
            type: MOVIE_REVIEW_ACTIONS.CLOSE_INFO_MESSSAGE
        });
    };

    return (
        <>
            {!isLoadingMovie && !fetchMovieFailure ? (
                <Container className="p-3 min-vh-100">
                    <h1 className="text-center">Reviews</h1>
                    <div className="user-review-container mt-4">
                        <Alert
                            variant="danger"
                            show={reviewState.showError}
                            onClose={closeErrorAlert}
                            transition={false}
                        >
                            {reviewState.showError}
                        </Alert>
                        <Alert
                            variant="info"
                            dismissible
                            onClose={closeInfoAlert}
                            show={reviewState.showInfo}
                            transition={false}
                        >
                            {reviewState.infoMsg}
                        </Alert>
                        <UserRating rating={reviewState.rating} handleRating={handleRating} />
                        <TextArea
                            name="description"
                            type="text"
                            min={0}
                            rows={2}
                            onChange={handleReview}
                            value={reviewState.review}
                            Icon={MdRateReview}
                            placeholder="Add a public review..."
                            className="mb-1"
                        />
                        <div className="d-flex justify-content-end">
                            <Button
                                variant="danger"
                                onClick={handleSubmit}
                                disabled={reviewState.isSubmitting}
                            >
                                {reviewState.userReviewExists ? 'Update review' : 'Post'}
                            </Button>
                        </div>
                    </div>
                    <div className="mt-3">
                        {reviewState.isLoadingMovieReviews ? (
                            <Loader />
                        ) : (
                            <UserReviews reviews={reviewState.movieReviews} />
                        )}
                    </div>
                </Container>
            ) : null}
        </>
    );
};

export default MovieReviews;
