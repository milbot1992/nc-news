import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../api";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Voter from "./Voter";
import { patchLikes } from "../api";
import { Link } from "react-router-dom";
import "../Single-article.css";
import Loading from "./Loading";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import PostForm from "./PostForm";
import CommentsList from "./CommentsList";

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const [userLikes, setUserLikes] = useState(0);
    const [isLikesErr, setIsLikesErr] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentCount, setCommentCount] = useState(0)

    useEffect(() => {
        getArticleById(article_id)
        .then((article) => {
            setArticle(article);
            setLoading(false);
            setCommentCount(article.comment_count)
        })
        .catch((err) => {
            console.log(err);
        });
    }, [article_id]);

    const { author, title, body, topic, created_at, votes, article_img_url, comment_count } = article;
    
    let timeAgo = "";
    if (Date.parse(created_at)) {
        timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    }

    const updateAPILikes = (value) => {
        patchLikes(value, article_id)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            setIsLikesErr(true);
            setUserVotes(0);
        });
    };

    if (loading) return <Loading />;

    return (
        <>
        <Link to="/news" className="back-button">
            &laquo;
        </Link>
        <div className="single-article-info">
            <p className="author">{author}</p>
            <p className="time-ago">{timeAgo}</p>
        </div>
        <h2>{title}</h2>
        <div className = 'topic-container'>
        <Link to={`/news/${topic}`} className="topic-tag">
            <p className="topic-tag">{topic}</p>
        </Link>
        </div>
        <img
            className="single-article-image"
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            id="medium-image"
        />
        <p className="single-article-body">{body}</p>
        <div className="single-article-banner">
            <Voter
            type={"likes"}
            votes={votes}
            updateAPILikes={updateAPILikes}
            setUserLikes={setUserLikes}
            userLikes={userLikes}
            isLikesErr={isLikesErr}
            />
            <h3 className="comment-count">
            <a href="#first-comment-card">
                <ChatRoundedIcon />
                &nbsp;&nbsp;{commentCount}
            </a>
            </h3>
        </div>
        <PostForm article_id={article_id} setComments={setComments} comments={comments} setCommentCount={setCommentCount}/>
        <CommentsList 
            comments ={comments}
            setComments={setComments}
            article_id={article_id}
            setCommentCount={setCommentCount}
            commentCount={commentCount}
        />
        </>
    );
}
