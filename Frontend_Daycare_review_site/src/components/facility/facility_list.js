import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../scss/facility/facility_list.scss';
import noImageAvailable from '../../images/noimage.png'; // 画像をインポート
import Breadcrumbs from '../common_componets/Breadcrumbs'; // パンくずリストコンポーネントのインポート
const FacilityList = () => {
  const [facilities, setFacilities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 初期ページを1に設定
  const facilitiesPerPage = 5;

  useEffect(() => {
    // ページ遷移時にページ番号をリセット
    setCurrentPage(1);
    localStorage.setItem('currentPage', 1);

    axios
      .get('http://127.0.0.1:8000/api/items/')
      .then((res) => {
        setFacilities(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    // 現在のページをlocalStorageから取得
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(Number(storedPage));
    }
  }, []);

  const handleClick = (event) => {
    const pageNumber = Number(event.target.id);
    setCurrentPage(pageNumber);
    localStorage.setItem('currentPage', pageNumber);
    window.scrollTo(0, 0); // ページトップにスクロール
  };

  const indexOfLastFacility = currentPage * facilitiesPerPage;
  const indexOfFirstFacility = indexOfLastFacility - facilitiesPerPage;
  const currentFacilities = facilities.slice(
    indexOfFirstFacility,
    indexOfLastFacility
  );

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(facilities.length / facilitiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <Breadcrumbs />
      <div className="facility_list">
        <div className="facility_container">
          <div className="facility__inner">
            <h1>施設リスト</h1>
            <div className="map_link">
              <Link to="/search" className="link_button">
                <span>
                  <i className="fa-solid fa-map-location-dot"></i>
                </span>
                マップで表示
              </Link>
            </div>
            <p className="search_result">
              保育施設検索結果
              <span className="search_count">{facilities.length}</span>件
            </p>
            <ul>
              {currentFacilities.map((facility) => (
                <li key={facility.id}>
                  <div className="facility-item">
                    <Link to={`/facility/items/${facility.id}`}>
                      <div className="facility__contents">
                        <img
                          src={facility.image_1 || noImageAvailable}
                          alt={facility.name}
                          className="facility-image"
                        />
                        <div className="facility-info">
                          <h3 className="facility-name">{facility.name}</h3>
                          <dl className="facility_text">
                            <dt>住所</dt>
                            <dd>{facility.address}</dd>
                          </dl>
                          <dl className="facility_text">
                            <dt>最寄駅</dt>
                            <dd>{facility.nearest_station}</dd>
                          </dl>
                          <dl className="facility_text">
                            <dt>保育時間</dt>
                            <dd>{facility.childcare_hours}</dd>
                          </dl>
                        </div>
                      </div>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="pagination">
              {pageNumbers.map((number) => (
                <button
                  key={number}
                  id={number}
                  onClick={handleClick}
                  className={`page-number ${
                    currentPage === number ? 'active' : ''
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FacilityList;
