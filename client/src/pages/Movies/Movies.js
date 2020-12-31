import React, { useReducer } from 'react';
import './Movies.scss';
import { Row, Col } from 'react-bootstrap';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import Input from '../../components/Input/Input';
import { FaStar, FaSearch } from 'react-icons/fa';

const ACTIONS = {
    SET_CURRENT_GENRE: 'set-current-genre',
    SET_RATING: 'set-rating',
    SET_SEARCH_FILTER: 'set-search-filter'
};

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SET_CURRENT_GENRE:
            return { ...state, currentGenre: action.payload.genre };
        case ACTIONS.SET_RATING:
            return { ...state, rating: action.payload.rating };
        case ACTIONS.SET_SEARCH_FILTER:
            return { ...state, searchFilter: action.payload.searchFilter };
        default:
            return state;
    }
};

const initialState = {
    genres: [],
    currentGenre: 'All',
    rating: 0,
    searchFilter: ''
};

const Home = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="p-5">
            <Row>
                <Col sm={12} lg={2}>
                    <h4 className="text-muted text-left">Filters</h4>
                    <GenreFilter
                        genres={state.genres}
                        currentGenre={state.currentGenre}
                        dispatch={dispatch}
                    />
                    <Input
                        onChange={(e) =>
                            dispatch({
                                type: ACTIONS.SET_RATING,
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
                                type: ACTIONS.SET_SEARCH_FILTER,
                                payload: { searchFilter: e.target.value }
                            })
                        }
                        Icon={FaSearch}
                        label="Search Movie"
                        placeholder="Search..."
                        className="mt-sm-3 mt-lg-0"
                    />
                </Col>
            </Row>
        </div>
    );
};

export default Home;
export { ACTIONS };
