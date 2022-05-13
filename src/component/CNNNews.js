import React, { useState, useEffect } from "react";
import "./news.css";

export default function CNNNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        document.title = 'CNN News';
        async function getNews() {
            const req = await fetch(
                "https://berita-indo-api.vercel.app/v1/cnn-news/"
              );
            const resp = await req.json();
            setArticles(resp.data);
            setLoading(false);
        }
        getNews();
    }, []);

    const searchItems = (searchValue) => {
        setSearchInput(searchValue);
        if (searchValue !== '') {
            const filteredNews = articles.filter((news) => {
                return Object.values(news.title).join('').toLowerCase().includes(searchValue.toLowerCase())
            });
            if (filteredNews.length < 1) {
                setNotFound(true);
            }
            setFilteredResults(filteredNews);
        } else {
            setFilteredResults(articles);
            setNotFound(false);
        }
    }
    
    function relog() {
        window.location.reload();
    }

    return(
        <div className="main-content">
            <div className="title">
                <h2>All CNN News</h2>
                <p>we have lots of news that must be read by you guys because of all news here likely have the greatest new things to be read as well</p>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => searchItems(e.target.value)}
            />
            {loading && (<h2 style={{color: "white"}}>Loading...</h2>)}
            {notFound && (<h2 style={{color: "white"}} className="notFound">Article isn't found, Please try again<button onClick={relog}>Relog</button></h2>)}
            {!notFound && (
                <div className="article">
                    {searchInput.length > 1 ? (
                        filteredResults.map((news) => (
                            <article key={news.id} className="news">
                                <a href={news.link} target="blank">
                                    <img src={news.image.large} style={{ width: "100%" }} alt={news.title} />
                                </a>
                                <h2>
                                    <a href={news.link} className="article-title" target="blank">
                                        {news.title}
                                    </a>
                                </h2>
                                <p style={{color: "lightgray"}}>{news.contentSnippet}</p>
                                <time className="article-time">
                                    {new Date(news.isoDate).toLocaleDateString()}
                                </time>
                            </article>
                        ))
                    ) : (
                        articles.map((news) => (
                            <article key={news.id} className="news">
                                <a href={news.link} target="blank">
                                    <img src={news.image.large} style={{ width: "100%" }} alt={news.title} />
                                </a>
                                <h2>
                                    <a href={news.link} className="article-title" target="blank">
                                        {news.title}
                                    </a>
                                </h2>
                                <p style={{color: "lightgray"}}>{news.contentSnippet}</p>
                                <time className="article-time">
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