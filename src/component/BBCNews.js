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
                <h2 className="text-2xl font-bold">All BBC News</h2>
            </div>
            <input
                className="input-box"
                placeholder="Search.."
                onChange={(e) => getItems(e.target.value)}
            />
            {loading && (<h2 className="loading" style={{color: "white"}}>Loading...</h2>)}
            {notFound ? (
                <h2 style={{color: "white"}} className="notFound">Article isn't found, Please try again<button onClick={relog}>Relog</button></h2>
            ) : (
                <div className="article grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {input.length > 1 ? (
                        output.map((news) => {
                            return(
                                <article key={news.id} className="news">
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
                                <h2 className="text-wrap">
                                    <a href={news.link} className="article-title text-wrap" target="blank">{news.title}</a>
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