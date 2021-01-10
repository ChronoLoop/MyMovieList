import React from 'react';
import './UserReviews.scss';

const UserReviews = ({ reviews }) => {
    console.log(reviews);

    return (
        <ul className="user-reviews">
            {reviews.map((review) => {
                return <li key={review._id}>{review.review}</li>;
            })}
        </ul>
    );
};

export default UserReviews;
