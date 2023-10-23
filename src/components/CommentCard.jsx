import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function CommentCard({ body, author, votes, created_at }) {
    
    const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    
    return (
        <section className="comment-card">
            <div className = 'comment-card-header'>
            <h3>{author}</h3>
            <p>⏲️ {timeAgo}</p>
            </div>
            <p className = 'comment-body'>{body}</p>
            <p className = 'comment-votes'>Votes: {votes}</p>

        </section>
    );
}