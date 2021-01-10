import React from 'react';
import './MovieInfo.scss';
//components
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import MovieReviews from './partials/MovieReviews';
import MovieInfoById from './partials/MovieInfoById';
import EditMovie from './partials/EditMovie';
//context
import { useMovieInfoContext } from '../../contexts/MovieInfoContext';
import { useAuthContext } from '../../contexts/AuthContext';

const MovieInfo = () => {
    const { state } = useMovieInfoContext();
    const { isAuth } = useAuthContext();
    return (
        <ScrollTop>
            {state.editMode && isAuth ? (
                <EditMovie />
            ) : (
                <>
                    <MovieInfoById />
                    {!state.isLoadingMovie && !state.fetchMovieFailure ? (
                        <hr className="movie-info" />
                    ) : null}
                    <MovieReviews />
                </>
            )}
        </ScrollTop>
    );
};

export default MovieInfo;
