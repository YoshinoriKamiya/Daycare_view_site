import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mv from '../../images/MV.png';
import '../../scss/top-page/mv.scss'; 

const Mv = () => {
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (location) {
      navigate(`/map/${location}`);
    }
  };

  return (
    <>
      <div className="main_view">
        <img src={mv} alt="mv" className="mv_img" />
        <div className="search_box"> 
          <h2 className="search_title">保育園施設を検索する</h2>
          <div className="search_input">
            <input 
              placeholder="都道府県、駅名を入力"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <button onClick={handleSearch}>検索</button>
          </div>
          <div className='search_control_item'>
              <a href="#">現在地から探す</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mv;
