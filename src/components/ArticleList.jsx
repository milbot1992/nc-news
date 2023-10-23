import ArticleCard from "./ArticleCard";
import { useEffect, useState, Fragment } from "react";
import { getArticles } from "../api.js";
import Loading from "./Loading";
import { Link } from "react-router-dom";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
        .then((articles) => {
            setArticles(articles);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    if (loading) return <Loading />;

    return (
        <>
        <h2>Latest News</h2>
        <p>Browse through articles below</p>
        <ul className = 'article-list'>
            {articles.map(({ article_id, title, article_img_url, topic, created_at }) => (
                <Fragment key={article_id}>
                <li>
                <Link to={`/articles/${article_id}`}>
                    <ArticleCard
                    title={title}
                    article_img_url={article_img_url}
                    topic={topic}
                    created_at={created_at}
                    />
                </Link>
                </li>
                </Fragment>
            ))}
        </ul>
        </>
    );
}
