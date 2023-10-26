import React, { useState, useEffect, Fragment } from "react";
import { getCommentsById } from "../api";
import CommentCard from "./CommentCard";
import Loading from "./Loading";

export default function CommentsList({comments, setComments, article_id, setCommentCount, commentCount}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const commentsPerPage = 10;

    useEffect(() => {
        loadComments(currentPage);
    }, [article_id, currentPage]);

    const loadComments = (page) => {
        getCommentsById(article_id, page)
        .then((newComments) => {
            setComments([...comments, ...newComments]);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const handleLoadMore = () => {
        setCurrentPage(currentPage + 1);
    };

    if (loading) return <Loading />;

    return (
        <div>
        {loading && <Loading />}
        <ul className="comments-list">
            {comments.length === 0 ? (
            <li>No comments yet</li>
            ) : (
            comments.map(({ comment_id, body, author, votes, created_at }, index) => (
                <Fragment key={comment_id}>
                
                <li id={index === 0 ? "first-comment-card" : ""}>
                    <CommentCard
                    comment_id={comment_id}
                    body={body}
                    author={author}
                    votes={votes}
                    created_at={created_at}
                    setComments={setComments}
                    comments={comments}
                    setCommentCount={setCommentCount}
                    />
                </li>
                </Fragment>
            ))
            )}
        </ul>
        {commentCount >= currentPage * commentsPerPage && (
            <button className="load-more-comments" onClick={handleLoadMore}>
            Load More Comments
            </button>
        )}
        </div>
    )

}

