import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/user/login.scss';
import Breadcrumbs from '../common_componets/Breadcrumbs'; // パンくずリストコンポーネントのインポート
// import { useNavigate } from 'react-router-dom';  // useNavigate を使用する場合はコメントを外す

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/token/',
        { username, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.access) {
        // トークンをローカルストレージに保存
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        console.log(response.data.access);
        alert('ログイン成功');
        
        // ローカルストレージからトークンを取得
        const access_token = localStorage.getItem('access_token');

        // ユーザー情報を取得するためのGETリクエスト
        const userResponse = await axios.get(
          'http://127.0.0.1:8000/api/myself/',
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: 'application/json',
            },
          }
        );

        console.log(userResponse.data.id);
        const userId = userResponse.data.id;
        localStorage.setItem('user_id', userId);
            // ログインページにリダイレクト
        navigate('/');

      }
      
    } catch (error) {
      if (error.response) {
        setError(error.response.data.detail || 'ログインに失敗しました。');
      } else if (error.request) {
        setError('サーバーからの応答がありません。');
      } else {
        setError('リクエストの送信中にエラーが発生しました。');
      }
    }
  };

  return (
    <>
      <Breadcrumbs />
      <div className="login">
        <h2>ログインページ</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">ユーザー名</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </>
  );
};

export default Login;
