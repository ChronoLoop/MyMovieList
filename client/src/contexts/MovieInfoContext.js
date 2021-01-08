import React, { useReducer, useContext } from 'react';

const MOVIE_INFO_ACTIONS = {
    MOVIE_FETCH_START: 'movie-fetch-start',
    MOVIE_FETCH_SUCCESS: 'movie-fetch-success',
    MOVIE_FETCH_FAILURE: 'movie-fetch-failure'
};

const ADMIN_ACTIONS = {
    OPEN_ADMIN_ERROR: 'open-admin-error',
    CLOSE_ADMIN_ERROR: 'close-admin-error',
    MOVIE_DELETE_START: 'movie-delete-start',
    MOVIE_DELETE_END: 'movie-delete-end',
    MOVIE_DELETE_SUCCESS: 'movie-delete-success',
    MOVIE_DELETE_FAILURE: 'movie-delete-failure',
    MOVIE_EDIT_START: 'movie-edit-start'
};

const MOVIE_REVIEW_ACTIONS = {
    SET_REVIEW: 'set-review',
    MOVIE_REVIEWS_FETCH_START: 'movies-reviews-fetch-start',
    MOVIE_REVIEWS_FETCH_SUCCESS: 'movies-reviews-fetch-success',
    OPEN_REVIEW_AUTH_ERROR: 'open-review-auth-error',
    CLOSE_REVIEW_AUTH_ERROR: 'close-review-auth-error'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_START:
            return {
                ...state,
                fetchMovieFailure: false,
                isLoadingMovie: true
            };
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                movie: action.payload.movie,
                fetchMovieFailure: false,
                isLoadingMovie: false
            };
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_FAILURE:
            return {
                ...state,
                fetchMovieFailure: true,
                isLoadingMovie: false
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_START:
            return {
                ...state,
                hasAdminError: false,
                deleteMovieFailure: false,
                showDeleteModal: true
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_END:
            return {
                ...state,
                hasAdminError: false,
                deleteMovieFailure: false,
                showDeleteModal: false
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_SUCCESS:
            return {
                ...state,
                deleteMovieFailure: false
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_FAILURE:
            return {
                ...state,
                deleteMovieFailure: true
            };
        case ADMIN_ACTIONS.MOVIE_EDIT_START:
            return {
                ...state,
                hasAdminError: false
            };
        case ADMIN_ACTIONS.OPEN_ADMIN_ERROR:
            return {
                ...state,
                hasAdminError: true
            };
        case ADMIN_ACTIONS.CLOSE_ADMIN_ERROR:
            return {
                ...state,
                hasAdminError: false
            };
        case MOVIE_REVIEW_ACTIONS.SET_REVIEW:
            return {
                ...state,
                review: action.payload.review
            };
        case MOVIE_REVIEW_ACTIONS.OPEN_REVIEW_AUTH_ERROR:
            return {
                ...state,
                reviewAuthError: true
            };
        case MOVIE_REVIEW_ACTIONS.CLOSE_REVIEW_AUTH_ERROR:
            return {
                ...state,
                reviewAuthError: false
            };
        default:
            return state;
    }
};

const initialState = {
    isLoadingMovie: true,
    fetchMovieFailure: false,
    movie: null,
    hasAdminError: false,
    showDeleteModal: false,
    deleteMovieFailure: false, //Todo: need to include
    review: '',
    reviewAuthError: false
};

const MovieInfoContext = React.createContext();

const useMovieInfoContext = () => {
    return useContext(MovieInfoContext);
};

const MovieInfoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <MovieInfoContext.Provider value={{ state, dispatch }}>
            {children}
        </MovieInfoContext.Provider>
    );
};

export {
    MovieInfoProvider,
    useMovieInfoContext,
    MOVIE_INFO_ACTIONS,
    ADMIN_ACTIONS,
    MOVIE_REVIEW_ACTIONS
};
