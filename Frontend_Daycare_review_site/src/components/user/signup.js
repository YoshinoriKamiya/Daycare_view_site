import React, { useState } from 'react';
import axios from 'axios';
import '../../scss/user/signup.scss';
import Breadcrumbs from '../common_componets/Breadcrumbs';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    postal_code: '',
    prefecture: '',
    city: '',
    town: '',
    child_birth_date: '',
    gender: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/users/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      alert('登録が完了しました');
      console.log(response.data); // レスポンスの結果をログに出力
    } catch (error) {
      console.error('Error:', error);
      alert('登録に失敗しました');
    }
  };

  return (
    <>
      <Breadcrumbs />
      <div className="sign-up">
        <h2>新規登録ページ</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">メールアドレス</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">名</label>
            <input
              type="text"
              id="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">姓</label>
            <input
              type="text"
              id="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone_number">電話番号</label>
            <input
              type="text"
              id="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal_code">郵便番号</label>
            <input
              type="text"
              id="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="prefecture">都道府県</label>
            <input
              type="text"
              id="prefecture"
              value={formData.prefecture}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">市区町村</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="town">町名・番地</label>
            <input
              type="text"
              id="town"
              value={formData.town}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="child_birth_date">子どもの生年月日</label>
            <input
              type="date"
              id="child_birth_date"
              value={formData.child_birth_date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">性別</label>
            <select id="gender" value={formData.gender} onChange={handleChange}>
              <option value="">選択してください</option>
              <option value="female">女性</option>
              <option value="male">男性</option>
              <option value="unspecified">指定しない</option>
            </select>
          </div>
          <button type="submit">登録</button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
