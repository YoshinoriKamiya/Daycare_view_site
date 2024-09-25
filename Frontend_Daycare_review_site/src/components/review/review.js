import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../scss/review/reviews.scss';
import useScrollToTop from '../common_componets/scrolltotop';

const Review = () => {
  useScrollToTop();
  const { id } = useParams(); // 施設IDを取得
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 1,
    title: '',
    content: '',
  });
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ
  const [reviewsPerPage] = useState(10); // 1ページあたり10件表示
  const [totalReviews, setTotalReviews] = useState(0); // 総レビュー件数

  useEffect(() => {
    const fetchReviews = () => {
      axios
        .get(`http://127.0.0.1:8000/api/reviews/?facility=${id}`)
        .then((res) => {
          const sortedReviews = res.data.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );
          setReviews(sortedReviews);
          setTotalReviews(sortedReviews.length); // 総レビュー件数を設定
        })
        .catch((err) => {
          console.error(
            'Error fetching reviews:',
            err.response ? err.response.data : err.message
          );
        });
    };

    fetchReviews();
  }, [id]);

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // 一番上にスクロール
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // 一番上にスクロール
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'star filled' : 'star'}>
          ★
        </span>
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(
      2,
      '0'
    )}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');

    if (!userId) {
      console.error('User ID is not available.');
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/reviews/`,
        {
          user_id: userId,
          facility_id: id,
          rating: newReview.rating,
          title: newReview.title,
          content: newReview.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setReviews((prevReviews) => [res.data, ...prevReviews]);
        setNewReview({
          rating: 1,
          title: '',
          content: '',
        });
      })
      .catch((err) => {
        console.error(
          'Error submitting review:',
          err.response ? err.response.data : err.message
        );
      });
  };

  return (
    <section className="new_reviews">
      <div className="block_inner">
        <div className="container">
          <ul>
            {currentReviews.map((review, index) => (
              <li className="review" key={index}>
                <div className="review-content">
                  <div className="review-header">
                    <p className="name">ユーザー名: {review.user.username}</p>
                    <p className="review_date">
                      {formatDate(review.created_at)}
                    </p>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                  </div>
                  <p className="review_title">{review.title}</p>
                  <p className="review_content">{review.content}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="pagination">
            {currentPage > 1 && (
              <button onClick={handlePrevPage}>前のページ</button>
            )}
            {indexOfLastReview < totalReviews && (
              <button onClick={handleNextPage}>次のページ</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
