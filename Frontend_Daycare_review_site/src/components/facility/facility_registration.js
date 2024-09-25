import axios from 'axios';
import React, { useReducer, useState } from 'react';
import '../../scss/facility/facility-regist.scss';
import Breadcrumbs from '../common_componets/Breadcrumbs'; // パンくずリストコンポーネントのインポート
const initialState = {
    name: '',
    address: '',
    nearest_station: '',
    images: [null, null, null, null, null], // 画像用の状態
    previews: ['', '', '', '', ''], // 画像のプレビュー
    feature_main_1: '',
    feature_content_1: '',
    feature_main_2: '',
    feature_content_2: '',
    feature_main_3: '',
    feature_content_3: '',
    phone_number: '',
    closed_days: '',
    childcare_hours: '',
    extended_childcare: '',
    facility_type: '',
    age_group: '',
    capacity: '',
    amenities: '',
    contact_email: '',
    website_url: '',
    isFileTypeError: false,
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, [action.field]: action.value };
        case 'SET_IMAGE':
            return {
                ...state,
                images: action.images,
                previews: action.previews,
                isFileTypeError: false
            };
        case 'RESET':
            return initialState;
        default:
            return state;
    }
}

const FacilityRegistration = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [facilities, setFacilities] = useState([]);

    const emptyTarget = (event) => {
        event.currentTarget.value = '';
    };

    const handleFiles = (event) => {
        const files = Array.from(event.target.files);
        if (files.length > 5) {
            alert('画像は最大5枚までアップロードできます。');
            return;
        }

        const previews = [];
        const validFiles = files.filter(file => ["image/jpeg", "image/png", "image/jpg"].includes(file.type));
        if (validFiles.length !== files.length) {
            dispatch({ type: 'SET_FIELD', field: 'isFileTypeError', value: true });
            return;
        }

        validFiles.forEach(file => {
            previews.push(URL.createObjectURL(file));
        });

        const updatedImages = [...state.images];
        validFiles.forEach((file, index) => {
            if (index < 5) updatedImages[index] = file;
        });

        dispatch({ type: 'SET_IMAGE', images: updatedImages, previews });
    };

    const newFacility = async () => {
        if (state.name === "" || state.address === "") {
            alert('施設名または住所が未入力です');
            return;
        }

        const formData = new FormData();
        Object.keys(state).forEach(key => {
            if (key.startsWith('images') || key.startsWith('previews')) return;
            if (state[key] !== '') formData.append(key, state[key]);
        });

        state.images.forEach((image, index) => {
            if (image) formData.append(`image_${index + 1}`, image);
        });

        try {
            const res = await axios.post('http://127.0.0.1:8000/facility/items/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFacilities([...facilities, res.data]);
            alert('施設を登録しました。');
            dispatch({ type: 'RESET' });
        } catch (error) {
            console.error("There was an error registering the facility!", error);
        }
    };

    const handleChange = (e) => {
        dispatch({ type: 'SET_FIELD', field: e.target.name, value: e.target.value });
    };

    return (
        <>
            <Breadcrumbs />
            <div className="facility_regist">
                <h1>施設登録</h1>
                <form className="Form">
                    {/* Basic Information */}
                    <div className="Form-Item">
                        <p className="Form-Item-Label">
                            施設名
                            <span className="Form-Item-Label-Required facility_name">必須</span>
                        </p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）あおぞら保育園"
                            name="name"
                            value={state.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">
                            住所
                            <span className="Form-Item-Label-Required address">必須</span>
                        </p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）東京都千代田区千代田1-1"
                            name="address"
                            value={state.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* Features */}
                    <div className="Form-Features">
                        {[1, 2, 3].map(num => (
                            <div key={num} className="Form-Feature">
                                <div className="Form-Feature-Item">
                                    <p className="Form-Feature-Label">特徴{num}:タイトル</p>
                                    <input
                                        className="Form-Feature-Input"
                                        name={`feature_main_${num}`}
                                        value={state[`feature_main_${num}`]}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="Form-Feature-Item">
                                    <p className="Form-Feature-Label">特徴{num}:内容</p>
                                    <textarea
                                        className="Form-Feature-Input"
                                        name={`feature_content_${num}`}
                                        value={state[`feature_content_${num}`]}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Image Upload */}
                    {[0, 1, 2].map(index => (
                        <div key={index} className="Form-Item">
                            <p className="Form-Item-Label">画像{index + 1}</p>
                            <input
                                type="file"
                                accept="image/*"
                                name={`image_${index + 1}`}
                                className="Form-Image-Input"
                                onChange={handleFiles}
                                onClick={emptyTarget}
                            />
                            {/* {state.previews[index] && (
                                <div className="Form-Image-Preview">
                                    <img src={state.previews[index]} alt={`Preview ${index + 1}`} />
                                </div>
                            )} */}
                        </div>
                    ))}
                    {state.isFileTypeError && <p className="error-message">画像ファイルはJPEGまたはPNG形式でアップロードしてください。</p>}
                    
                    {/* Additional Information */}
                    <div className="Form-Item">
                        <p className="Form-Item-Label">電話番号</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）03-1234-5678"
                            name="phone_number"
                            value={state.phone_number}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">休園日</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）土曜日、日曜日"
                            name="closed_days"
                            value={state.closed_days}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">保育時間</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）月曜日～金曜日：7:30～18:30"
                            name="childcare_hours"
                            value={state.childcare_hours}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">延長保育</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）18:30～20:00"
                            name="extended_childcare"
                            value={state.extended_childcare}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">施設の種類</p>
                        <select
                            className="Form-Item-Input"
                            name="facility_type"
                            value={state.facility_type}
                            onChange={handleChange}
                        >
                            <option value="">選択してください</option>
                            <option value="保育園">保育園</option>
                            <option value="幼稚園">幼稚園</option>
                            <option value="認定こども園">認定こども園</option>
                            <option value="小規模保育事業">小規模保育事業</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">対象年齢</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）0歳～6歳"
                            name="age_group"
                            value={state.age_group}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">定員</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）30名"
                            name="capacity"
                            value={state.capacity}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">設備</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）図書室、屋外遊具"
                            name="amenities"
                            value={state.amenities}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">連絡先メール</p>
                        <input
                            type="email"
                            className="Form-Item-Input"
                            placeholder="例）info@example.com"
                            name="contact_email"
                            value={state.contact_email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="Form-Item">
                        <p className="Form-Item-Label">ウェブサイトURL</p>
                        <input
                            type="text"
                            className="Form-Item-Input"
                            placeholder="例）https://example.com"
                            name="website_url"
                            value={state.website_url}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='Form-Submit'>
                        <button type="button" className="Form-Submit" onClick={newFacility}>
                            登録
                        </button>

                    </div>
                </form>
            </div>
        </>
    );
};

export default FacilityRegistration;
