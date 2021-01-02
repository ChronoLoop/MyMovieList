import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './GenreFilter.scss';
import { ACTIONS } from '../../pages/Movies/Movies';

const setClass = (genre, active) => {
    const classButtons = 'list-item';
    return genre === active ? classButtons + ' list-item-active' : classButtons;
};

const GenreFilters = ({ genres, currentGenre, dispatch }) => {
    const handleOnClick = (genre) => {
        dispatch({ type: ACTIONS.SET_CURRENT_GENRE, payload: { genre: genre } });
    };
    return (
        <div className="genre-filter-container ">
            <label>Genres</label>
            <ListGroup as="ul">
                <ListGroup.Item
                    as="li"
                    className={setClass('All', currentGenre)}
                    onClick={() => handleOnClick('All')}
                >
                    All
                </ListGroup.Item>
                {genres &&
                    genres.map((item) => (
                        <ListGroup.Item
                            as="li"
                            key={item._id}
                            className={setClass(item.genre, currentGenre)}
                            onClick={() => handleOnClick(item.genre)}
                        >
                            {item.genre}
                        </ListGroup.Item>
                    ))}
            </ListGroup>
        </div>
    );
};

export default GenreFilters;
