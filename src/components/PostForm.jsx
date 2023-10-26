import { postComment } from "../api";
import AddCommentIcon from '@mui/icons-material/AddComment';
import React, { useState, useContext, useEffect } from "react";
import { UserContext } from '../contexts/UserContext'

export default function PostForm ({article_id, setComments, comments, setCommentCount}) {
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [isAdding, setIsAdding] = useState(false)
    const [postErr, setPostErr] = useState(false);
    const [isPost, setIsPost] = useState(false);
    const { user, setUser } = useContext(UserContext)
    

    useEffect(() => {
        const storedUser = localStorage.getItem('selectedUser');
        if (storedUser) {
            setUser(storedUser);
        }})

    const handlePostComment = () => {
        if (commentText.trim() !== '') {
            setIsAdding(true)
            const commentToBeAdded = {
                                username: user,
                                body: commentText
                                }
            
            postComment(article_id, commentToBeAdded)
                .then((response) => {
                    const newComment = response.data.comment
                    setComments([newComment, ...comments]);
                    setCommentText('');
                    setIsAdding(false)
                    setPostErr('')
                    setIsPost(true)
                    setCommentCount((currentCount) => Number(currentCount) + 1)
                })
                .catch((error) => {
                    console.log(error);
                    setIsAdding(false)
                    setPostErr('Error posting comment')
                    setIsPost(false)
                });
        } else {
            setPostErr('Error posting comment - cannot post blank comment')
            setIsPost(false)
        }
    }

    return (
        <>
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
        {postErr !== '' && <p className = 'error-text'>{postErr}</p>}
        {isPost && <p className = 'post-text'>Comment Posted - see in list below</p>}
        </>
    )
}


