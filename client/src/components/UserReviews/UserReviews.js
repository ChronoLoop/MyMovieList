import React from 'react';
import './UserReviews.scss';
import MovieRating from '../MovieRating/MovieRating';

const UserReviews = ({ reviews }) => {
    return (
        <ul className="user-reviews">
            {reviews.map((review) => {
                return (
                    <li key={review._id} className="mt-3">
                        <div className="author-header mb-1">{review.user.username}</div>
                        <div className="content">
                            <MovieRating
                                rating={review.rating}
                                className="mr-1"
                                comment={
                                    (review.rating ? '/10 - ' : ' - ') +
                                    (review.review || 'No comment.')
                                }
                            />
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default UserReviews;
