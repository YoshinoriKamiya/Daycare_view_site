import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'; // useParamsをインポート
import { jwtDecode } from 'jwt-decode';
import '../../scss/review/review_form.scss';
import useScrollToTop from '../common_componets/scrolltotop';
import Breadcrumbs from '../common_componets/Breadcrumbs'; // パンくずリストコンポーネントのインポート

const ReviewForm = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const { id } = useParams(); // 施設IDを取得
  const [newReview, setNewReview] = useState({
    rating: 1,
    title: '',
    content: '',
  });

  const [userId, setUserId] = useState(null);
  const [facilityName, setFacilityName] = useState('');

  useEffect(() => {
    // ユーザーIDをトークンから取得
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.user_id);
      } catch (error) {
        console.error('トークンのデコードエラー:', error);
      }
    }

    // 施設情報を取得
    axios
      .get(`http://127.0.0.1:8000/api/items/${id}/`)
      .then((res) => {
        setFacilityName(res.data.name); // 施設名を設定
      })
      .catch((err) => {
        console.error(
          '施設情報取得エラー:',
          err.response ? err.response.data : err.message
        );
      });
  }, [id]);

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
      console.error('ユーザーIDが利用できません。');
      return;
    }

    axios
      .post(
        `http://127.0.0.1:8000/api/reviews/`,
        {
          user_id: userId,
          facility_id: parseInt(id, 10), // IDを整数に変換
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
        console.log('レビューが正常に投稿されました:', res.data);
        setNewReview({
          rating: 1,
          title: '',
          content: '',
        });
        alert('口コミが投稿されました');
        navigate(`/facility/items/${id}`); // 投稿後に施設ページへ遷移
      })
      .catch((err) => {
        console.error(
          'レビュー投稿エラー:',
          err.response ? err.response.data : err.message
        );
      });
  };

  return (
    <>
      <Breadcrumbs />
      <div className="review-form">
        <h2 className="review-form__title">口コミを投稿する</h2>
        <p className="review-form__facility-name">
          施設名: {facilityName}
        </p>
        <form onSubmit={handleSubmit} className="review-form__form">
          <div className="review-form__group">
            <label className="review-form__label">タイトル:</label>
            <input
              type="text"
              name="title"
              value={newReview.title}
              onChange={handleInputChange}
              required
              className="review-form__input"
            />
          </div>
          <div className="review-form__group">
            <label className="review-form__label">評価:</label>
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleInputChange}
              required
              className="review-form__select"
            >
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="review-form__group">
            <label className="review-form__label">内容:</label>
            <textarea
              name="content"
              value={newReview.content}
              onChange={handleInputChange}
              required
              className="review-form__textarea"
            />
          </div>
          <button type="submit" className="review-form__button">
            投稿する
          </button>
        </form>
      </div>
    </>
  );
};

export default ReviewForm;
