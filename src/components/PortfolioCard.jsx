import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ArticleImage from '../assets/Article1.jpg'
import pageInfo from '../assets/PageInfo.json'

export default function PortfolioCard () {
    const timeAgo = formatDistanceToNow(new Date(pageInfo.created_at), { addSuffix: true });
    
    return (
        <section className="article-card1">
            <img
            src={ArticleImage}
            alt={`a photo to depict the article: ${pageInfo.title}`}
            />
            <div className="article-card-content1">
            <h2>{pageInfo.title}</h2>
            <h4>The backend of this portfolio project comprises a RESTful API built using Node.js, PostgreSQL, and Express.js, with Git employed for version control. The frontend is a dynamic Single Page Application built using React.</h4>
            <h4>Click to learn more about this portofolio piece.</h4>
            <p>{pageInfo.topic}  |  ⏲️{timeAgo}</p><br></br><br></br><br></br>
            <p className = 'comment-vote-container1'>
                <ThumbUpOffAltIcon />&nbsp;{pageInfo.votes}
            </p>
            </div>
        </section>
    );
}