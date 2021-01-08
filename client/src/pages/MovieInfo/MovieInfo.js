import React from 'react';
import { Container } from 'react-bootstrap';
import './MovieInfo.scss';
//components
import ScrollTop from '../../components/ScrollTop/ScrollTop';
import MovieReviews from './partials/MovieReviews';
import MovieInfoById from './partials/MovieInfoById';
// import EditMovie from './partials/EditMovie';

const MovieInfo = () => {
    return (
        <ScrollTop>
            <Container className="p-3 my-3">
                <MovieInfoById />
            </Container>
            <hr className="movie-info" />
            <Container className="p-3">
                <MovieReviews />
            </Container>
        </ScrollTop>
    );
};

export default MovieInfo;
