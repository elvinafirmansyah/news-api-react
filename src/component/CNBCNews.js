import React, { useEffect, useState } from "react";
import "./news.css";


export default function CNBCNews() {
    const [bbcnews, setCnbcNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState([]);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        document.title = 'CNBC News';
        async function getNews() {
            const req = await fetch(
                'https://berita-indo-api.vercel.app/v1/cnbc-news/'
            )
            const resp = await req.json();
            setCnbcNews(resp.data)
            setLoading(false);
        }
        getNews()
    }, []);

    const getNews = (searchValue) => {
        setInput(searchValue);
        if (input !== '') {
            const filteredNews = bbcnews.filter((news) => {
                return Object.values(news.title).join('').toLowerCase().includes(input.toLowerCase());
            })
            if (filteredNews.length < 1) {
                setNotFound(true);
            }
            setOutput(filteredNews);
        } else {
            setOutput(bbcnews);
            setNotFound(false);
        }
    }

    function relog() {
        window.location.reload();
    }

    return(
        <div className="main-content">
            <div className="title">
                <h2>All CNBC News</h2>
                <p>we have lots of news that must be read by you guys because of all news here likely have the greatest new things to be read as well</p>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => getNews(e.target.value)}
            />
            {loading && <h2 style={{color: "white"}}>Loading...</h2>}
            {notFound && (<h2 style={{color: "white"}} className="notFound">Article isn't found, Please try again<button onClick={relog}>Relog</button></h2>)}
            {!notFound && (
                <div className="article">
                    {input.length > 1 ? (
                        output.map((news) => (
                                <article key={news.id} className="news">
                                    <a href={news.link} target="blank">
                                        <img src={news.image.large} style={{ width: "100%" }} alt={news.title} />
                                    </a>
                                    <h2>
                                        <a href={news.link} className="article-title" target="blank">{news.title}</a>
                                    </h2>
                                    <p style={{color: "lightgray"}}>{news.contentSnippet}</p>
                                    <time>
                                        {new Date(news.isoDate).toLocaleDateString()}
                                    </time>
                                </article>
                        ))
                    ) : (
                        bbcnews.map((news) => (
                            <article key={news.id} className="news">
                                <a href={news.link} target="blank">
                                        <img src={news.image.large} style={{ width: "100%" }} alt={news.title} />
                                    </a>
                                <h2>
                                    <a href={news.link} className="article-title" target="blank">{news.title}</a>
                                </h2>
                                <p style={{color: "lightgray"}}>{news.contentSnippet}</p>
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