import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import mv from '../../images/MV.png';
import '../../scss/top-page/raring_info.scss'; 

export const RatingInfo = () => {
    const [ratingInfo, setRatingInfo] = useState([
        {date:'20XX月XX日', text: "text1" },
        {date:'20XX月XX日', text: "text1" },
        {date:'20XX月XX日', text: "text1" },
        {date:'20XX月XX日', text: "text1" },
        {date:'20XX月XX日', text: "text1" },
        {date:'20XX月XX日', text: "text1" },
    ]);

    return (
        <section className="child_rearing_info">
            <div className="block_inner">
                <div className="container">
                    <h2>新着の子育て情報</h2>
                    <Swiper
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 30,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 40,
                            },
                            1200: {
                                slidesPerView: 5,
                                spaceBetween: 50,
                            },
                        }}
                        navigation
                    >
                        {ratingInfo.map((item, index) => (
                            <SwiperSlide key={index}>
                                <div className='info_box'>
                                    <div className="image">
                                        <img src={mv} alt="mv" className="mv_img" />
                                    </div>
                                    <div>
                                        <p className='date'>{item.date}</p>
                                        <p className='text'>{item.text}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='more-btn'>
                        <button>一覧を見る</button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default RatingInfo;
