import React from 'react';
import '../../scss/top-page/area-search.scss'; 
import { Link } from 'react-router-dom';
import japan_map from '../../images/japan_map.png';

const AreaSearch = () => {
    const areas = [
        { name: "北海道・東北", prefectures: ["北海道", "青森県", "岩手県", "秋田県", "山形県", "福島県"] },
        { name: "関東", prefectures: ["茨城県", "栃木県", "埼玉県", "千葉県", "東京都", "神奈川県", "群馬県"] },
        { name: "甲信越・北陸", prefectures: ["新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県"] },
        { name: "東海", prefectures: ["岐阜県", "静岡県", "愛知県", "三重県"] },
        { name: "関西", prefectures: ["滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県"] },
        { name: "中国", prefectures: ["鳥取県", "島根県", "岡山県", "広島県", "山口県"] },
        { name: "四国", prefectures: ["徳島県", "香川県", "愛媛県", "高知県"] },
        { name: "九州・沖縄", prefectures: ["福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"] }
    ];

    return (
        <>
            <section className="area-search">
                <div className="bg"></div>
                <div className="block_inner">
                    <div className="container">
                        <h2>エリアから探す</h2>
                        <img src={japan_map} alt={japan_map} />
                        <div className="top_area_box posi01">
                            <p className="top_area_box_title">近畿</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">滋賀県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">京都府</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">大阪府</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">兵庫県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">奈良県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">和歌山県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi02">
                            <p className="top_area_box_title">信越・北陸</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">新潟県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">富山県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">石川県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">福井県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">長野県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">山梨県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi03">
                            <p className="top_area_box_title">北海道・東北</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">北海道</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">青森県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">岩手県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">宮城県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">秋田県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">山形県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">福島県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi04">
                            <p className="top_area_box_title">関東</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">茨城県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">栃木県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">群馬県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">埼玉県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">千葉県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">東京都</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">神奈川県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi05">
                            <p className="top_area_box_title">東海</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">岐阜県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">静岡県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">愛知県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">三重県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi06">
                            <p className="top_area_box_title">九州・沖縄</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">福岡県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">佐賀県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">長崎県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">熊本県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">大分県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">宮崎県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">鹿児島県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">沖縄県</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="top_area_box posi07">
                            <p className="top_area_box_title">中国・四国</p>
                            <ul className="area_list">
                                <li className="area_item">
                                    <Link className="area_link">鳥取県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">島根県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">岡山県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">広島県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">山口県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">徳島県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">香川県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">愛媛県</Link>
                                </li>
                                <li className="area_item">
                                    <Link className="area_link">高知県</Link>
                                </li>
                            </ul>
                        </div>

                        {/* {areas.map((area) => (
                            <div className="area" key={area.name}>
                                <p className="area-name">{area.name}</p>
                                <ul className="area-list">
                                    {area.prefectures.map((prefecture) => (
                                        <li key={prefecture}>
                                            <Link to={`/map/${prefecture}`}>{prefecture}</Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))} */}
                    </div>
                </div>
            </section>
        </>
    );
}

export default AreaSearch;
