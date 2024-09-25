import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../scss/facility/facility_item.scss';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import useScrollToTop from '../common_componets/scrolltotop';
import noImageAvailable from '../../images/noimage.png';
import Tabs from './tabs'; // 追加
import Review from '../review/review'; // 追加
import Breadcrumbs from '../common_componets/Breadcrumbs'; // パンくずリストコンポーネントのインポート
import { jwtDecode } from 'jwt-decode';



const mapStyles = {
  width: '100%',
  height: '400px',
};

const mapOptions = {
  mapTypeControl: false,
  zoomControl: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const FacilityItem = () => {
  useScrollToTop();

  const { id } = useParams();
  const navigate = useNavigate();
  const [facility, setFacility] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const googleMapsApiKey = 'AIzaSyCA5voL0Z3oJMnWIdqRBfue8WmjKYeDRag';
  const [userId, setUserId] = useState(null);
  const [facilityName, setFacilityName] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuperUser, setIsSuperUser] = useState(false);


  useEffect(() => {
    const checkLoginStatus = async () => {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        try {
          const decodedToken = jwtDecode(access_token);
          const currentTime = Math.floor(Date.now() / 1000);
          if (decodedToken.exp > currentTime) {
            setIsLoggedIn(true);
            setUserId(decodedToken.user_id);

            // API 呼び出しで is_superuser を取得
            const response = await axios.get('http://127.0.0.1:8000/api/myself/', {
              headers: {
                Authorization: `Bearer ${access_token}`,
                Accept: 'application/json',
              },
            });
            setIsSuperUser(response.data.is_superuser); // APIから取得したis_superuserをセット
            console.log(response.data.is_superuser);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('トークンの解析エラー:', error);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    checkLoginStatus();
  }, []);
  
  useEffect(() => {
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

  useEffect(() => {
    const getFacility = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/items/${id}/`);
        setFacility(res.data);
      } catch (error) {
        console.error('Error fetching facility data:', error);
      }
    };
    getFacility();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('削除しますか？');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8000/api/items/${id}/`);
        alert('削除されました');
        navigate('/facility_list');
      } catch (error) {
        console.error('Error deleting facility:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      ...facility,
      image_1: facility.image_1,
      image_2: facility.image_2,
      image_3: facility.image_3,
      image_4: facility.image_4,
      image_5: facility.image_5,
    });
  };

  const handleChange = (e) => {
    const { name, type, files, value } = e.target;
    if (type === 'file') {
      setEditData({
        ...editData,
        [name]: files[0],
        [`${name}_name`]: getFileName(files[0]),
      });
    } else {
      setEditData({ ...editData, [name]: value });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editData.name || '');
      formData.append('address', editData.address || '');
      formData.append('nearest_station', editData.nearest_station || '');
      formData.append('phone_number', editData.phone_number || '');
      formData.append('website_url', editData.website_url || '');
      formData.append('facility_type', editData.facility_type || '');
      formData.append('message', editData.message || '');
      formData.append('feature_main_1', editData.feature_main_1 || '');
      formData.append('feature_content_1', editData.feature_content_1 || '');
      formData.append('feature_main_2', editData.feature_main_2 || '');
      formData.append('feature_content_2', editData.feature_content_2 || '');
      formData.append('feature_main_3', editData.feature_main_3 || '');
      formData.append('feature_content_3', editData.feature_content_3 || '');
      formData.append('message', editData.message || '');
      formData.append('establishment_date', editData.establishment_date || '');

      if (editData.image_1 instanceof File) {
        formData.append('image_1', editData.image_1);
      }
      if (editData.image_2 instanceof File) {
        formData.append('image_2', editData.image_2);
      }
      if (editData.image_3 instanceof File) {
        formData.append('image_3', editData.image_3);
      }
      if (editData.image_4 instanceof File) {
        formData.append('image_4', editData.image_4);
      }
      if (editData.image_5 instanceof File) {
        formData.append('image_5', editData.image_5);
      }

      const response = await axios.put(
        `http://127.0.0.1:8000/api/items/${id}/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const updatedFacility = {
        ...facility,
        ...response.data,
        image_1:
          editData.image_1 instanceof File
            ? response.data.image_1 + '?' + new Date().getTime()
            : facility.image_1,
        image_2:
          editData.image_2 instanceof File
            ? response.data.image_2 + '?' + new Date().getTime()
            : facility.image_2,
        image_3:
          editData.image_3 instanceof File
            ? response.data.image_3 + '?' + new Date().getTime()
            : facility.image_3,
        image_4:
          editData.image_4 instanceof File
            ? response.data.image_4 + '?' + new Date().getTime()
            : facility.image_4,
        image_5:
          editData.image_5 instanceof File
            ? response.data.image_5 + '?' + new Date().getTime()
            : facility.image_5,
      };

      setFacility(updatedFacility);
      setIsEditing(false);
      alert('変更が保存されました');
    } catch (error) {
      console.error(
        'Error updating facility:',
        error.response ? error.response.data : error.message
      );
      alert('変更の保存に失敗しました');
    }
  };

  const getFileName = (fileInput) => {
    if (fileInput instanceof File) {
      return fileInput.name;
    }
    return fileInput ? fileInput.split('/').pop() : '';
  };

  const convertNewlinesToParagraphs = (text) => {
    if (!text) {
      return null;
    }
    return text.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  if (!facility) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        Loading...
      </div>
    );
  }

  const images = [
    facility.image_1 || noImageAvailable,
    facility.image_2,
    facility.image_3,
    facility.image_4,
    facility.image_5,
  ].filter(Boolean);

  return (
    <>
      <Breadcrumbs />
      <div className="top">
        <div className="top__inner inner">
          <div className="top__block">
            <div className="top__image">
              <Swiper
                spaceBetween={50}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                modules={[Navigation, Pagination, Autoplay]}
              >
                {images.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img src={image} alt={`Slide ${index}`} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            <div className="top__text">
              <div className="top__header">
                <h2>{facility.name}</h2>
                <div className="top__tags">
                  <span className="top__tag">私立</span>
                  <span className="top__tag">幼稚園</span>
                </div>
              </div>
              <div className="top__info">
                <div className="top__address">住所：{facility.address}</div>
                <div className="top__tel">TEL：{facility.phone_number}</div>
                <div className="top__web">Web：{facility.website_url}</div>
              </div>
              {isLoggedIn && (
                <button
                  className="top__button"
                  onClick={() => navigate(`/facility/items/${id}/review_form`)}
                >
                  口コミする
                </button>
              )}

              <div className="management_button">
                {isLoggedIn && isSuperUser && (
                  <div className="management_button">
                    <button onClick={handleDelete}>削除</button>
                    <button onClick={handleEdit}>編集</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="edit-form">
          <h2>施設の編集</h2>
          <form>
            <div>
              <label>名前:</label>
              <input
                type="text"
                name="name"
                value={editData.name || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>住所:</label>
              <input
                type="text"
                name="address"
                value={editData.address || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>最寄駅</label>
              <input
                type="text"
                name="nearest_station"
                value={editData.nearest_station || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>電話番号</label>
              <input
                type="text"
                name="phone_number"
                value={editData.phone_number || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Web:</label>
              <input
                type="text"
                name="website_url"
                value={editData.website_url || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>施設種類</label>
              <input
                type="text"
                name="facility_type"
                value={editData.facility_type || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>メッセージ</label>
              <textarea
                type="text"
                name="message"
                value={editData.message || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴1_タイトル</label>
              <textarea
                name="feature_main_1"
                value={editData.feature_main_1 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴1_内容</label>
              <textarea
                name="feature_content_1"
                value={editData.feature_content_1 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴2_タイトル</label>
              <textarea
                name="feature_main_2"
                value={editData.feature_main_2 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴2_内容</label>
              <textarea
                name="feature_content_2"
                value={editData.feature_content_2 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴3_タイトル</label>
              <textarea
                name="feature_main_3"
                value={editData.feature_main_3 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>特徴3_内容</label>
              <textarea
                name="feature_content_3"
                value={editData.feature_content_3 || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>設立日</label>
              <input
                type="date"
                name="establishment_date"
                value={editData.establishment_date || ''}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>画像1:</label>
              <input
                type="file"
                accept="image/*"
                name="image_1"
                onChange={handleChange}
              />
              <span>{getFileName(editData.image_1) || facility.image_1}</span>
            </div>
            <div>
              <label>画像2:</label>
              <input
                type="file"
                accept="image/*"
                name="image_2"
                onChange={handleChange}
              />
              <span>{getFileName(editData.image_2) || facility.image_2}</span>
            </div>
            <div>
              <label>画像3:</label>
              <input
                type="file"
                accept="image/*"
                name="image_3"
                onChange={handleChange}
              />
              <span>{getFileName(editData.image_3) || facility.image_3}</span>
            </div>

            <button type="button" onClick={handleSave}>
              保存
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              キャンセル
            </button>
          </form>
        </div>
      )}

      {!isEditing && (
        <Tabs
          tabs={[
            {
              label: '施設情報',
              content: (
                <div className="contents">
                  <div className="contents__inner inner">
                    <div className="contents__block">
                      <ul className="contents__list">
                        <li className="contents__item">
                          <div className="contents__info message">
                            <div className="contents__label message">
                              <p>メッセージ</p>
                            </div>
                            <p className="contents__value">
                              {facility.message}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">特徴</p>
                            <div className="contents__features">
                              <div className="feature">
                                <p className="feature__title">
                                  {facility.feature_main_1}　
                                  {facility.feature_content_1}
                                </p>
                              </div>
                              <div className="feature">
                                <p className="feature__title">
                                  {facility.feature_main_2}　
                                  {facility.feature_content_2}
                                </p>
                              </div>
                              <div className="feature">
                                <p className="feature__title">
                                  {facility.feature_main_3}　
                                  {facility.feature_content_3}
                                </p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">教育方針</p>
                            <p className="contents__value">
                              {facility.philosophy}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">保育時間</p>
                            <p className="contents__value">
                              {facility.childcare_hours}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">受入月齢</p>
                            <p className="contents__value">
                              {facility.age_group}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">定員</p>
                            <p className="contents__value">
                              {facility.capacity}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info under">
                            <p className="contents__label">設備</p>
                            <div className="amenities-text">
                              {convertNewlinesToParagraphs(facility.amenities)}
                            </div>
                          </div>
                        </li>
                        <div className="basic_info_text">
                          <p>基本情報</p>
                        </div>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">施設種類</p>
                            <p className="contents__value">
                              {facility.facility_type}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">住所</p>
                            <p className="contents__value">
                              {facility.address}
                            </p>
                          </div>
                          <div className="facility-item-map">
                            <LoadScriptNext googleMapsApiKey={googleMapsApiKey}>
                              <GoogleMap
                                mapContainerStyle={mapStyles}
                                zoom={15}
                                center={{
                                  lat: parseFloat(facility.lat),
                                  lng: parseFloat(facility.lng),
                                }}
                                options={mapOptions}
                              >
                                <MarkerF
                                  key={facility.id}
                                  position={{
                                    lat: parseFloat(facility.lat),
                                    lng: parseFloat(facility.lng),
                                  }}
                                />
                              </GoogleMap>
                            </LoadScriptNext>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">最寄駅</p>
                            <p className="contents__value">
                              {facility.nearest_station}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">電話番号</p>
                            <p className="contents__value">
                              {facility.phone_number}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">開設年月日</p>
                            <p className="contents__value">
                              {facility.establishment_date}
                            </p>
                          </div>
                        </li>
                        <li className="contents__item">
                          <div className="contents__info">
                            <p className="contents__label">ホームページ</p>
                            <p className="contents__value">
                              {facility.website_url}
                            </p>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              label: '口コミ',
              content: <Review facilityId={id} />,
            },
          ]}
        />
      )}
    </>
  );
};

export default FacilityItem;
