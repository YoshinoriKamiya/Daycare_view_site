import React, { useState, useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../scss/common/breadcrumbs.scss';

const facilityCache = {};

const Breadcrumbs = () => {
  const { id } = useParams();
  const [facilityName, setFacilityName] = useState(facilityCache[id] || '施設名取得中...');
  const location = useLocation();
  const rawPathnames = location.pathname.split('/').filter((x) => x);

  // 'items' とその後のID部分を除外
  const pathnames = rawPathnames.filter((value, index) => {
    return !(value === 'items' || (index > 0 && rawPathnames[index - 1] === 'items'));
  });

  useEffect(() => {
    const getFacility = async () => {
      try {
        if (!facilityCache[id]) {
          const res = await axios.get(`http://localhost:8000/api/items/${id}/`);
          facilityCache[id] = res.data.name;
          setFacilityName(res.data.name);  // 施設の名前を設定
        } else {
          setFacilityName(facilityCache[id]);
        }
      } catch (error) {
        console.error('Error fetching facility data:', error);
        setFacilityName('施設名取得エラー');  // エラー時の処理
      }
    };
    if (id) {
      getFacility();
    }
  }, [id]);

  // パス名とラベルの対応マップ
  const labelMap = {
    '': 'ホーム',
    'about': '保育ねっとについて',
    'facility_registration': '施設登録',
    'facility_list': '施設リスト',
    'facility': facilityName, // 動的に設定される施設名
    'review_form': '口コミ投稿',
    'sign_up':'新規登録',
    'login':'ログイン',
    'mypage':'マイページ',
    
  };

  return (
    <nav className="breadcrumbs">
      <Link to="/">保育ねっと</Link> <span> &gt; </span>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const label = labelMap[value] || value;

        return (
          <React.Fragment key={to}>
            {isLast ? (
              <span>{label}</span>
            ) : (
              <>
                <Link to={to}>{label}</Link>
                <span> &gt; </span>
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
