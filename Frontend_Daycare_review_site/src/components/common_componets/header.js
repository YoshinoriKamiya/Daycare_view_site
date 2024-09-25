import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/common/header.scss';
// import logo from '../images/logo.png';

const Menu = ({ isLoggedIn }) => {
  const links = [
    { path: '/about', link_name: '保育ねっとについて' },
    { path: '/search', link_name: '保育施設を検索する' },
    { path: '/raring_info', link_name: '子育て情報' },
    { path: '/facility_list', link_name: '施設リスト' },
  ];

  const loggedInLinks = [
    { path: '/facility_registration', link_name: '施設登録' },
    { path: '/mypage', link_name: 'マイページ' },

  ]

  const loggedOutLinks = [
    { path: '/login', link_name: 'ログイン' },
    { path: '/sign_up', link_name: '新規登録' },
  ];

  return (
    <>
      {links.map((link) => (
        <li key={link.link_name}>
          <Link to={link.path} className="link">
            {link.link_name}
          </Link>
        </li>
      ))}
      {isLoggedIn && loggedInLinks.map((link) => (
        <li key={link.link_name}>
          <Link to={link.path} className="link">
            {link.link_name}
          </Link>
        </li>
      ))}
      {!isLoggedIn && loggedOutLinks.map((link) => (
        <li key={link.link_name}>
          <Link to={link.path} className="link">
            {link.link_name}
          </Link>
        </li>
      ))}
    </>
  );
};

const Header = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('access_token');

  const toggleMenu = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    // ローカルストレージからトークンを削除
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_id');

    // ログインページにリダイレクト
    navigate('/');
  };

  return (
    <header className="header">
      <div className="block_inner">
        <nav className="nav-header">
          <h1>
            <Link to="/" className="link logo">
              保育ねっと
            </Link>
          </h1>
          <ul className="header-links">
            <Menu isLoggedIn={isLoggedIn} />
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout} className="logout-button">
                  ログアウト
                </button>
              </li>
            )}
          </ul>
          <div className={`hum-btn ${open ? 'open' : ''}`} onClick={toggleMenu}>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="menu_text">Menu</span>
          </div>
          {open && (
            <ul className="nav-header-drawer open">
              <Menu isLoggedIn={isLoggedIn} />
              {isLoggedIn && (
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    ログアウト
                  </button>
                </li>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
