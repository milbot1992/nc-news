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
import AddCommentIcon from '@mui/icons-material/AddComment';
import { postComment } from "../api";

export default function SingleArticle() {
    const { article_id } = useParams();
    const [article, setArticle] = useState({});
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);
    const [userLikes, setUserLikes] = useState(0);
    const [isLikesErr, setIsLikesErr] = useState(false);
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isAdding, setIsAdding] = useState(false)
    const [isPostErr, setIsPostErr] = useState(false);
    
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
            setIsLikesErr(true);
            setUserVotes(0);
        });
    }

    const handlePostComment = () => {
        if (commentText.trim() !== '') {
            setIsAdding(true)
            const commentToBeAdded = {
                                username: 'tickle122',
                                body: commentText
                                }

            postComment(article_id, commentToBeAdded)
                .then((response) => {
                    const newComment = response.data.comment
                    setComments([newComment, ...comments]);
                    setCommentText('');
                    setIsAdding(false)
                    setIsPostErr(false)
                })
                .catch((error) => {
                    console.log(error);
                    setIsAdding(false)
                    setIsPostErr(true)
                });
        }
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
                isLikesErr = {isLikesErr}/>
            <h3 className="comment-count">
                <a href="#first-comment-card">
                    <ChatRoundedIcon />
                    &nbsp;&nbsp;{comment_count}
                </a>
            </h3>
        </div>
        <div className='post-comment' onClick={() => setShowCommentForm(!showCommentForm)}>
            <AddCommentIcon />
            <span>&nbsp;&nbsp;Leave a comment</span>
        </div>
        
        {showCommentForm && (
                <div className="comment-form">
                    <textarea
                        placeholder="Write your comment here..."
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <button onClick={handlePostComment}>{isAdding ? 'Posting...' : 'Post Comment'}</button>
                </div>
        )}
        {isPostErr && <p className = 'error-text'>Error posting comment</p>}
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
