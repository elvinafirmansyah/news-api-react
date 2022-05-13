import React, { useEffect, useState } from "react";
import "./news.css";


export default function BBCNews() {
    const [loading, setLoading] = useState(true);
    const [articles, setBbcNews] = useState([]);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        document.title = 'BBC News';
        async function getNews() {
            const req = await fetch(
                'https://berita-indo-api.vercel.app/v1/bbc-news'
            )
            const resp = await req.json();
            setBbcNews(resp.data);
            setLoading(false);
        }
        getNews();
    }, []);

    const getItems = (searchValue) => {
        setInput(searchValue);
        if (searchValue !== '') {
            const filteredNews = articles.filter((news) => {
                return Object.values(news.title).join('').toLowerCase().includes(searchValue.toLowerCase())
            });  
            setOutput(filteredNews);
            if (filteredNews.length < 1) {
                setNotFound(true);
            }
        } else {
            setOutput(articles);
            setNotFound(false);
        }
    }

    function relog() {
        window.location.reload();
    }
    return(
        <div className="main-content">
            <div className="title">
                <h2>All BBC News</h2>
                <p>we have lots of news that must be read by you guys because of all news here likely have the greatest new things to be read as well</p>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => getItems(e.target.value)}
            />
            {loading && <h2 style={{ color: "white" }}>Loading...</h2>}
            {notFound ? (
                <h2 style={{color: "white"}} className="notFound">Article isn't found, Please try again<button onClick={relog}>Relog</button></h2>
            ) : (
                <div className="article">
                    {input.length > 1 ? (
                        output.map((news) => {
                            return(
                                <article key={news.id} className="news">
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