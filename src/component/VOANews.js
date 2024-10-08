import React, { useState, useEffect } from "react";
import "./news.css";

export default function TribunNews() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [filteredResults, setFilteredResults] = useState([]);
    const [notFound, setNotFound] = useState(false);


    useEffect(() => {
        async function getNews() {
            const req = await fetch(
                'https://berita-indo-api.vercel.app/v1/voa'
            );
            const resp = await req.json();
            setArticles(resp.data);
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
                <h2 className="text-2xl font-bold">All VOA News</h2>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => searchItems(e.target.value)}
            />
            {loading && (<h2 className="loading" style={{color: "white"}}>Loading...</h2>)}
            {notFound ? (
                <h2 style={{color: "white"}} className="notFound">Article isn't found, Please try again<button onClick={relog}>Relog</button></h2>
            ) : (
                <div className="article grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                                        {new Date(news.isoDate).toLocaleDateString('id-ID', {
    weekday: 'long', // displays the day of the week
    year: 'numeric',
    month: 'long',  // displays the full month name
    day: 'numeric'
})}
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
                                    {new Date(news.isoDate).toLocaleDateString('id-ID', {
    weekday: 'long', // displays the day of the week
    year: 'numeric',
    month: 'long',  // displays the full month name
    day: 'numeric'
})}
                                </time>
                            </article>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}