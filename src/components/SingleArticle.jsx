import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { getArticleById } from "../api";
import { getCommentsById } from "../api";
import CommentCard from "./CommentCard";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([])

    useEffect(() => {
        getArticleById(article_id)
        .then((article) => {
            setArticle(article);
        })
        .catch((err) => {
            console.log(err);
        });

        getCommentsById(article_id)
        .then((comments) => {
            setComments(comments)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [article_id]);

    const { author, title, body, topic, created_at, votes, article_img_url, comment_count } = article;

    let timeAgo = "";
    if (Date.parse(created_at)) {
        timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    }

    return (
        <>
        <div className = 'single-article-info'>
            <p className="author">{author}</p>
            <p className="time-ago">{timeAgo}</p>
        </div>
        <h2>{title}</h2>
        <p></p>
        <img className = 'single-article-image'
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            id="medium-image"
        />
        <p className = 'single-article-body'>{body}</p>
        <div className = 'single-article-votes'>
            <h3>Votes: {votes} </h3>
            <h3>Comments: {comment_count}</h3>
            <h3>{topic}</h3>
        </div>

        <ul className = 'comments-list'>
            {comments.map(({ comment_id, body, author, votes, created_at }) => (
                <Fragment key={comment_id}>
                <li>
                    <CommentCard
                    body={body}
                    author={author}
                    votes={votes}
                    created_at={created_at}
                    />
                </li>
                </Fragment>
            ))}
        </ul>
        </>
    );
}
