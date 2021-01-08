import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { MdRateReview } from 'react-icons/md';
//contexts
// import { useAuthContext } from '../../../contexts/AuthContext';
import { useMovieInfoContext, MOVIE_REVIEW_ACTIONS } from '../../../contexts/MovieInfoContext';
//components
import TextArea from '../../../components/TextArea/TextArea';
import Loader from '../../../components/Loader/Loader';

const MovieReviews = () => {
    const { state, dispatch } = useMovieInfoContext();
    // const { isAuth } = useAuthContext();

    const handleReview = (e) => {
        dispatch({ type: MOVIE_REVIEW_ACTIONS.SET_REVIEW, payload: { review: e.target.value } });
    };

    return (
        <>
            <h1 className="text-center">Reviews</h1>
            <div className="user-review-container mt-3">
                <Alert
                    variant="info"
                    dismissible
                    onClose={() => dispatch({ type: MOVIE_REVIEW_ACTIONS.CLOSE_REVIEW_AUTH_ERROR })}
                    show={state.reviewAuthError}
                >
                    Must be signed in to add a review or rate the movie.
                </Alert>
                <TextArea
                    name="description"
                    type="text"
                    min={0}
                    rows={2}
                    onChange={handleReview}
                    value={state.review}
                    Icon={MdRateReview}
                    placeholder="Add a public review..."
                    className="mb-1"
                />
                <div className="d-flex justify-content-end">
                    <Button variant="danger">Post</Button>
                </div>
            </div>
            <Loader />
        </>
    );
};

export default MovieReviews;
