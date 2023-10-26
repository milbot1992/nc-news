import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { deleteComment } from '../api';
import { UserContext } from '../contexts/UserContext'
import React, { useState, useContext, useEffect } from "react";

export default function CommentCard({ comment_id, body, author, votes, created_at, setComments, setCommentCount }) {
    const [isDeleting, setIsDeleting] = useState(false)
    const [deleteErr, setDeleteErr] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        const storedUser = localStorage.getItem('selectedUser');
        if (storedUser) {
            setUser(storedUser);
        }})

    let timeAgo = "";
    if (Date.parse(created_at)) {
        timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    }
    
    const handleDelete = () => {
        setIsDeleting(true)
        deleteComment(comment_id)
        .then(() => {
            setComments((comments) => comments.filter((comment) => comment.comment_id !== comment_id));
            setIsDeleting(false)
            setDeleteErr('')
            setCommentCount((currentCount) => Number(currentCount) - 1)
            setIsDeleted(true)
        })
        .catch((error) => {
            console.log(error);
            setIsDeleting(false)
            setDeleteErr('Error deleting comment')
        });
    }

    return (
        <>
        <section className="comment-card">
            <div className = 'comment-card-header'>
            <h3>{author}</h3>
            <p>⏲️ {timeAgo}</p>
            </div>
            <p className = 'comment-body'>{body}</p>
            <p className = 'comment-votes'>Votes: {votes}</p>
            {user===author && (
            <>
            <button className = 'delete-comment-button' onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? 'Deleting...' : 'Delete Comment'}
            </button>
            {deleteErr !== '' && <p className = 'error-text'>{deleteErr}</p>}
            </>
            )}
        </section>
        {isDeleted && (
            <p className='delete-text'>Comment Deleted</p>
        )}
        </>
    );
}