import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScriptNext, MarkerF } from '@react-google-maps/api';
import { useParams } from 'react-router-dom';
import noImageAvailable from '../../images/noimage.png';
import '../../scss/top-page/map.scss';

const mapStyle = {
    width: '100%',
    height: '100vh'
};

const mapOptions = {
    mapTypeControl: false,
    zoomControl: true,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
        {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.business",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.medical",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.place_of_worship",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.school",
            stylers: [{ visibility: "off" }]
        },
        {
            featureType: "poi.sports_complex",
            stylers: [{ visibility: "off" }]
        },
    ]
};

const prefectureCoordinates = {
    "北海道": { lat: 43.06417, lng: 141.34694 },
    "青森県": { lat: 40.82444, lng: 140.74 },
    "岩手県": { lat: 39.70361, lng: 141.1525 },
    "宮城県": { lat: 38.26889, lng: 140.87194 },
    "秋田県": { lat: 39.71861, lng: 140.1025 },
    "山形県": { lat: 38.24056, lng: 140.36333 },
    "福島県": { lat: 37.75, lng: 140.46778 },
    "茨城県": { lat: 36.34139, lng: 140.44667 },
    "栃木県": { lat: 36.56583, lng: 139.88361 },
    "群馬県": { lat: 36.39111, lng: 139.06083 },
    "埼玉県": { lat: 35.85694, lng: 139.64889 },
    "千葉県": { lat: 35.60472, lng: 140.12333 },
    "東京都": { lat: 35.68944, lng: 139.69167 },
    "神奈川県": { lat: 35.44778, lng: 139.6425 },
    "新潟県": { lat: 37.90222, lng: 139.02361 },
    "富山県": { lat: 36.69528, lng: 137.21139 },
    "石川県": { lat: 36.59444, lng: 136.62556 },
    "福井県": { lat: 36.06528, lng: 136.22194 },
    "山梨県": { lat: 35.66389, lng: 138.56833 },
    "長野県": { lat: 36.65139, lng: 138.18111 },
    "岐阜県": { lat: 35.39111, lng: 136.72222 },
    "静岡県": { lat: 34.97556, lng: 138.3825 },
    "愛知県": { lat: 35.18028, lng: 136.90667 },
    "三重県": { lat: 34.73028, lng: 136.50861 },
    "滋賀県": { lat: 35.00444, lng: 135.86833 },
    "京都府": { lat: 35.02139, lng: 135.75556 },
    "大阪府": { lat: 34.68639, lng: 135.52 },
    "兵庫県": { lat: 34.69139, lng: 135.18306 },
    "奈良県": { lat: 34.68528, lng: 135.83278 },
    "和歌山県": { lat: 34.22611, lng: 135.1675 },
    "鳥取県": { lat: 35.50361, lng: 134.23833 },
    "島根県": { lat: 35.47222, lng: 133.05056 },
    "岡山県": { lat: 34.66167, lng: 133.935 },
    "広島県": { lat: 34.39639, lng: 132.45944 },
    "山口県": { lat: 34.18583, lng: 131.47139 },
    "徳島県": { lat: 34.06583, lng: 134.55944 },
    "香川県": { lat: 34.34028, lng: 134.04333 },
    "愛媛県": { lat: 33.84167, lng: 132.76611 },
    "高知県": { lat: 33.55972, lng: 133.53111 },
    "福岡県": { lat: 33.60639, lng: 130.41806 },
    "佐賀県": { lat: 33.24944, lng: 130.29889 },
    "長崎県": { lat: 32.74472, lng: 129.87361 },
    "熊本県": { lat: 32.78972, lng: 130.74167 },
    "大分県": { lat: 33.23806, lng: 131.6125 },
    "宮崎県": { lat: 31.90778, lng: 131.42028 },
    "鹿児島県": { lat: 31.56028, lng: 130.55806 },
    "沖縄県": { lat: 26.2125, lng: 127.68111 }
};

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [facility, setFacility] = useState(null);
    const googleMapsApiKey = "AIzaSyCA5voL0Z3oJMnWIdqRBfue8WmjKYeDRag";
    const { prefecture } = useParams();
    const [center, setCenter] = useState({ lat: 35.6895, lng: 139.6917 }); // 東京都の緯度経度デフォルト
    const searchInputRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('http://127.0.0.1:8000/api/items/');
                setMarkers(res.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if (prefecture && prefectureCoordinates[prefecture]) {
            setCenter(prefectureCoordinates[prefecture]);
        }
    }, [prefecture]);

    const handleSearch = () => {
        const address = searchInputRef.current.value;
        if (address) {
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address }, (results, status) => {
                if (status === 'OK' && results[0]) {
                    const location = results[0].geometry.location;
                    setCenter({ lat: location.lat(), lng: location.lng() });
                } else {
                    alert('場所が見つかりませんでした。');
                }
            });
        }
    };

    return (
        <>
            <div className="map-container">
                <div className="search-bar">
                    <input
                        type="text"
                        ref={searchInputRef}
                        placeholder="場所を検索"
                    />
                    <button onClick={handleSearch}>検索</button>
                    <Link to="/facility_list" className='link_button'>
                        <span><i className="fa-solid fa-list"></i></span>
                        リスト表示
                    </Link>
                </div>
                <LoadScriptNext
                    googleMapsApiKey={googleMapsApiKey}
                    loadingElement={<div>Loading...</div>}
                >
                    <GoogleMap
                        mapContainerStyle={mapStyle}
                        center={center}
                        zoom={15}
                        options={mapOptions}
                    >
                        {markers.map(marker => (
                            <MarkerF
                                key={marker.id}
                                position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                                onClick={() => setFacility(marker)}
                            />
                        ))}
                    </GoogleMap>
                </LoadScriptNext>
                {facility && (
                    <Link to={`/facility/items/${facility.id}`} className="info-window">
                    <div className="info-window__block">
                        <div className="info-window_image">
                            <img src={facility.image || noImageAvailable} alt={facility.name} />
                        </div>
                        <div className='info-window_text'>
                            <h2>{facility.name}</h2>
                            <p>{facility.address}</p>
                        </div>
                    </div>
                </Link>
                )}
            </div>
        </>
    );
};

export default Map;
