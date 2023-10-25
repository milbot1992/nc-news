import ArticleCard from "./ArticleCard";
import { useEffect, useState, Fragment } from "react";
import { getArticles } from "../api.js";
import Loading from "./Loading";
import { Link, useParams } from "react-router-dom";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { topic } = useParams()
    const [sortBy, setSortBy] = useState('created_at'); 
    const [order, setOrder] = useState('desc');

    useEffect(() => {
        getArticles(topic, sortBy, order)
        .then((articles) => {
            setArticles(articles);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }, [topic, sortBy, order]);

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === "sortBy") {
            setSortBy(value);
        } else if (name === "order") {
            setOrder(value);
        }
    };

    if (loading) return <Loading />;

    return (
        <>
        <h2>Latest News</h2>
        <p>Browse through articles below</p>
        <div className="sort-options">
            <label>
                Sort By:
                <select name="sortBy" value={sortBy} onChange={handleSortChange}>
                    <option value="created_at">Date</option>
                    <option value="comment_count">Comment Count</option>
                    <option value="votes">Votes</option>
                </select>
            </label>
            <label>
                Order:
                <select name="order" value={order} onChange={handleSortChange}>
                    <option value="desc">Descending</option>
                    <option value="asc">Ascending</option>
                </select>
            </label>
        </div>
        <ul className = 'article-list'>
            {articles.map(({ article_id, title, article_img_url, topic, created_at, comment_count, votes }) => (
                <Fragment key={article_id}>
                <li>
                <Link to={`/news/articles/${article_id}`}>
                    <ArticleCard
                    title={title}
                    article_img_url={article_img_url}
                    topic={topic}
                    created_at={created_at}
                    comment_count={comment_count}
                    votes={votes}
                    />
                </Link>
                </li>
                </Fragment>
            ))}
        </ul>
        </>
    );
}
