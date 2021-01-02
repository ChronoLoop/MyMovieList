import React, { useReducer, useContext } from 'react';

const MOVIE_ACTIONS = {
    SET_CURRENT_GENRE: 'set-current-genre',
    SET_GENRES: 'set-genres',
    SET_RATING: 'set-rating',
    SET_SEARCH_FILTER: 'set-search-filter',
    SET_MOVIES: 'set-movies'
};

const reducer = (state, action) => {
    switch (action.type) {
        case MOVIE_ACTIONS.SET_CURRENT_GENRE:
            return { ...state, currentGenre: action.payload.genre };
        case MOVIE_ACTIONS.SET_RATING:
            return { ...state, rating: action.payload.rating };
        case MOVIE_ACTIONS.SET_SEARCH_FILTER:
            return { ...state, searchFilter: action.payload.searchFilter };
        case MOVIE_ACTIONS.SET_GENRES:
            return { ...state, genres: action.payload.genres };
        case MOVIE_ACTIONS.SET_MOVIES:
            return { ...state, movies: action.payload.movies };
        default:
            return state;
    }
};

const initialState = {
    genres: [],
    currentGenre: 'All',
    rating: 0,
    searchFilter: '',
    movies: []
};

const MovieContext = React.createContext();

const useMovieContext = () => {
    return useContext(MovieContext);
};

const MovieProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return <MovieContext.Provider value={{ state, dispatch }}>{children}</MovieContext.Provider>;
};

export { MovieProvider, useMovieContext, MOVIE_ACTIONS };
