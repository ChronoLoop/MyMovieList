import React, { useEffect, useState } from 'react';
import { FaStar, FaSearch } from 'react-icons/fa';
import { Row, Col, Alert } from 'react-bootstrap';
import './Movies.scss';
//components
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Input from '../../components/Input/Input';
import Loader from '../../components/Loader/Loader';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
//actions and contexts
import { getGenres } from '../../actions/Genre';
import { getMovies } from '../../actions/Movie';
import { MOVIE_ACTIONS, useMovieContext } from '../../contexts/MovieContext';

const Home = () => {
    const { state, dispatch } = useMovieContext();
    const [error, setError] = useState(false);

    useEffect(() => {
        const setGenres = async () => {
            try {
                const res = await getGenres();
                dispatch({ type: MOVIE_ACTIONS.SET_GENRES, payload: { genres: res.data.genres } });
            } catch {
                setError(true);
            }
        };
        const setMovies = async () => {
            try {
                const res = await getMovies();
                dispatch({ type: MOVIE_ACTIONS.SET_MOVIES, payload: { movies: res.data.movies } });
            } catch {
                setError(true);
            }
        };
        setGenres();
        setMovies();
    }, [dispatch]);

    return (
        <>
            {state.movies && state.movies.length ? (
                <div className="p-5">
                    {error ? (
                        <Alert variant="danger">
                            <b>Error:</b> Movies or genres could not be loaded. Please try again at
                            a later time.
                        </Alert>
                    ) : null}
                    <Row>
                        <Col sm={12} lg={2}>
                            <h4 className="text-muted text-left">Filters</h4>
                            <GenreFilter
                                genres={state.genres}
                                currentGenre={state.currentGenre}
                                setCurrentGenre={(genre) =>
                                    dispatch({
                                        type: MOVIE_ACTIONS.SET_CURRENT_GENRE,
                                        payload: { genre: genre }
                                    })
                                }
                            />
                            <Input
                                onChange={(e) =>
                                    dispatch({
                                        type: MOVIE_ACTIONS.SET_RATING,
                                        payload: { rating: e.target.value }
                                    })
                                }
                                label="Rating"
                                Icon={FaStar}
                                type="number"
                                min={0}
                                max={10}
                                placeholder="0-10"
                                className="mt-3"
                            />
                        </Col>
                        <Col sm={12} lg={10}>
                            <Input
                                onChange={(e) =>
                                    dispatch({
                                        type: MOVIE_ACTIONS.SET_SEARCH_FILTER,
                                        payload: { searchFilter: e.target.value }
                                    })
                                }
                                Icon={FaSearch}
                                label="Search Movie"
                                placeholder="Search..."
                                className="mt-sm-3 mt-lg-0"
                            />
                            <MovieGrid movies={state.movies} />
                        </Col>
                    </Row>
                </div>
            ) : (
                <Loader />
            )}
        </>
    );
};

export default Home;
