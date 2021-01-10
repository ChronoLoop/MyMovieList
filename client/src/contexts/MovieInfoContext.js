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
    MOVIE_EDIT_START: 'movie-edit-start',
    MOVIE_EDIT_END: 'movie-edit-end'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_START:
            return {
                ...state,
                isLoadingMovie: true
            };
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_SUCCESS:
            return {
                ...state,
                movie: action.payload.movie,
                isLoadingMovie: false
            };
        case MOVIE_INFO_ACTIONS.MOVIE_FETCH_FAILURE:
            return {
                ...state,
                isLoadingMovie: false,
                errorMsg: 'Error: Movie could not be loaded. Please try again at a later time.',
                showError: true
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_START:
            return {
                ...state,
                showDeleteModal: true
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_END:
            return {
                ...state,
                showDeleteModal: false
            };
        case ADMIN_ACTIONS.MOVIE_DELETE_FAILURE:
            return {
                ...state,
                modalMsg: 'Movie could not be deleted. Please try again or at a later time.',
                showModal: true
            };
        case ADMIN_ACTIONS.MOVIE_EDIT_START:
            return {
                ...state,
                editMode: true
            };
        case ADMIN_ACTIONS.MOVIE_EDIT_END:
            return {
                ...state,
                editMode: false
            };
        case ADMIN_ACTIONS.OPEN_ADMIN_ERROR:
            return {
                ...state,
                modalMsg: 'Only admins can edit or delete movies.',
                showModal: true
            };
        case ADMIN_ACTIONS.CLOSE_ADMIN_ERROR:
            return {
                ...state,
                modalMsg: '',
                showModal: false
            };
        default:
            return state;
    }
};

const initialState = {
    isLoadingMovie: true,
    editMode: false,
    movie: null,
    showDeleteModal: false,
    errorMsg: '',
    showError: false,
    modalMsg: '',
    showModal: false
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

export { MovieInfoProvider, useMovieInfoContext, MOVIE_INFO_ACTIONS, ADMIN_ACTIONS };
