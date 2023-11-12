import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import '../UserProfile.css'

export default function UserArticleCard({ title, article_img_url, topic, created_at, comment_count, votes }) {
    
    const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    
    return (
        <section className="user-article-card">
            <img
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            />
            <div className="user-article-card-content">
            <h2>{title}</h2>
            <p>{topic}  |  ⏲️{timeAgo}</p><br></br><br></br><br></br>
            <p className = 'user-comment-vote-container'>
                <ChatRoundedIcon />
                &nbsp;&nbsp;{comment_count}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<ThumbUpOffAltIcon />&nbsp;{votes}
            </p>
            </div>
        </section>
    );
}