import React, { useState, useEffect } from "react";
import "./news.css";

export default function TribunNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);


    useEffect(() => {
        async function getNews() {
            const request = await fetch(
                'https://berita-indo-api.vercel.app/v1/voa'
            );
            const response = await request.json();
            setArticles(response.data);
            setLoading(false);
        };
        getNews();
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchInput !== '') {
            const filteredNews = articles.filter((news) => {
                return Object.values(news.title).join('').toLowerCase().includes(searchInput.toLowerCase())
            });            
            setFilteredResults(filteredNews);
        } else {
            setFilteredResults(articles);
        }
    }

    return(
        <div className="main-content">
            <div className="title">
                <h2>All VOA News</h2>
                <p>we have lots of news that must be read by you guys because of all news here likely have the greatest new things to be read as well</p>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => searchItems(e.target.value)}
            />
            {loading && <h2 className="loading-part" style={{ color: "white" }}>Loading...</h2>}
            {!loading && (
                <div className="article">
                    {searchInput.length > 1 ? (
                        filteredResults.map((news) => {
                            return(
                                <article key={news.id} className="news">
                                    <a href={news.link} target="blank">
                                        <img src={news.image.small} alt={news.title} style={{width: "100%"}} />
                                    </a>
                                    <h2>
                                        <a href={news.link} className="article-title" target="blank">{news.title}</a>
                                    </h2>
                                    <p style={{ color: "lightgray"}}>{news.description}</p>
                                    <time>
                                        {new Date(news.isoDate).toLocaleDateString()}
                                    </time>
                                </article>
                            )
                        })
                    ) : (
                        articles.map((news) => (
                            <article key={news.id} className="news">
                                <a href={news.link} target="blank">
                                    <img src={news.image.small} alt={news.title} style={{width: "100%"}} />
                                </a>
                                <h2>
                                    <a href={news.link} className="article-title" target="blank">{news.title}</a>
                                </h2>
                                <p style={{ color: "lightgray"}}>{news.description}</p>
                                <time>
                                    {new Date(news.isoDate).toLocaleDateString()}
                                </time>
                            </article>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}