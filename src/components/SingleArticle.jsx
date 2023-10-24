import { useParams } from "react-router-dom";
import { useEffect, useState, Fragment } from "react";
import { getArticleById } from "../api";
import { getCommentsById } from "../api";
import CommentCard from "./CommentCard";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import Voter from "./Voter";
import { patchLikes } from "../api";
import {Link} from 'react-router-dom'
import '../Single-article.css'
import Loading from "./Loading";
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [userLikes, setUserLikes] = useState(0);
    const [isErr, setIsErr] = useState(false);
    
    useEffect(() => {
        getArticleById(article_id)
        .then((article) => {
            setArticle(article);
            setLoading(false)
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

    const updateAPILikes = (value) => {
        patchLikes(value, article_id)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            setIsErr(true);
            setUserVotes(0);
        });
    }

    if (loading) return <Loading />;

    return (
        <>
        <Link to="/news" className='back-button'>&laquo;</Link>
        <div className = 'single-article-info'>
            <p className="author">{author}</p>
            <p className="time-ago">{timeAgo}</p>
        </div>
        <h2>{title}</h2>
        <p className = 'image-banner'>{topic}&nbsp;&nbsp;</p>
        <img className = 'single-article-image'
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            id="medium-image"
        />
        <p className = 'single-article-body'>{body}</p>
        <div className = 'single-article-banner'>
            <Voter 
                type={'likes'} 
                votes={votes} 
                updateAPILikes={updateAPILikes} 
                setUserLikes = {setUserLikes} 
                userLikes = {userLikes} 
                isErr = {isErr}/>
            <h3 className="comment-count">
                <a href="#first-comment-card">
                    <ChatRoundedIcon />
                    {comment_count}
                </a>
            </h3>
        </div>

        <ul className='comments-list'>
                {comments.length === 0 ? (
                    <li>No comments yet</li>
                ) : (
                        comments.map(({ comment_id, body, author, votes, created_at }, index) => (
                            <Fragment key={comment_id}>
                                <li id={index === 0 ? 'first-comment-card' : ''}>
                                    <CommentCard
                                        body={body}
                                        author={author}
                                        votes={votes}
                                        created_at={created_at}
                                    />
                                </li>
                            </Fragment>
                        ))
                    )}
            </ul>
        </>
    );
}
