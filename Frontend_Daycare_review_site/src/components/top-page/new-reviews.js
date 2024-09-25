import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../common_componets/apiclient';
import '../../scss/news/news.scss';

const NewReviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        apiClient.get('/reviews/')
            .then(res => {
                const sortedReviews = res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
                setReviews(sortedReviews);
            })
            .catch(err => {
                console.error(err); 
            });
    }, []);

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span 
                    key={i} 
                    className={i <= rating ? 'star filled' : 'star'}
                >
                    ★
                </span>
            );
        }
        return stars;
    };

    return (
        <section className="new_reviews">
            <div className="block_inner">
                <div className='container'>
                    <h2>新着の口コミ</h2>
                    <ul>
                        {reviews.slice(0, 4).map((review, index) => (
                            <li className="review" key={index}>
                                <Link to={`/facility/${review.facility.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <div className="review-header">
                                        <p className='type'>施設名: {review.facility.name}</p>
                                    </div>
                                    <div className="review-content">
                                        <p className="name">ユーザー名: {review.user.username}</p>
                                        <div className="review-rating">
                                            {renderStars(review.rating)}
                                        </div>
                                        <p className='review_title'>{review.title}</p>
                                        <p className='review_content'>{review.content}</p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <div className='more-btn'>
                        <button>口コミをもっと読む</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default NewReviews;
