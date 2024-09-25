import React, { useState } from 'react';
import '../../scss/news/news.scss'; 

export const News = () => {
    const [newsItems,setnewsItems] = useState([
        { date: "2024.04.14", text: "texttext1"},
        { date: "2024.04.15", text: "texttext2"},
        { date: "2024.04.15", text: "texttext2"},
    ])
 
    return (
        <>
            <section className="news">
                <div className="block_inner">
                    <div className="container">
                        <h2>お知らせ</h2>
                        <ul className='news_list'>
                            {newsItems.map((item, index) => (
                                <li key={index} className="news_item">
                                    <div className='news_header'>
                                        <p className="date">{item.date}</p>
                                        <p className='category'>新着情報</p>
                                    </div>
                                    <p className="text">{item.text}</p>
                                </li> 
                            ))}
                        </ul>
                        <div className='more-btn'>
                            <button>一覧を見る</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default News;