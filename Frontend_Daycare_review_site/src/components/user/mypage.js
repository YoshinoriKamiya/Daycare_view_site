import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../scss/user/mypage.scss';
import Breadcrumbs from '../common_componets/Breadcrumbs';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState({
    username:'',
    phone_number: '',
    postal_code: '',
    prefecture: '',
    city: '',
    town: '',
    child_birth_date: '',
    gender: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const access_token = localStorage.getItem('access_token');
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/myself/', {
          headers: {
            Authorization: `Bearer ${access_token}`,
            Accept: 'application/json',
          },
        });
        setUserInfo(response.data);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <>
      <Breadcrumbs />
      <div className="mypage-container">
        <div className="mypage-header">
          <h1>マイページ</h1>
        </div>
        <div className="user-info">
          <div className="info-item">
            <label>名前:</label>
            <span>{userInfo.username}</span>
          </div>
          <div className="info-item">
            <label>電話番号:</label>
            <span>{userInfo.phone_number}</span>
          </div>
          <div className="info-item">
            <label>郵便番号:</label>
            <span>{userInfo.postal_code}</span>
          </div>
          <div className="info-item">
            <label>都道府県:</label>
            <span>{userInfo.prefecture}</span>
          </div>
          <div className="info-item">
            <label>市区町村:</label>
            <span>{userInfo.city}</span>
          </div>
          <div className="info-item">
            <label>町域:</label>
            <span>{userInfo.town}</span>
          </div>
          <div className="info-item">
            <label>お子様の誕生日:</label>
            <span>{userInfo.child_birth_date}</span>
          </div>
          <div className="info-item">
            <label>性別:</label>
            <span>{userInfo.gender}</span>
          </div>
        </div>
        <button className="edit-button">編集</button>
      </div>
    </>
  );
};

export default MyPage;
