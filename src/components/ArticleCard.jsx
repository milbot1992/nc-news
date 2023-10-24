import formatDistanceToNow from 'date-fns/formatDistanceToNow';

export default function ArticleCard({ title, article_img_url, topic, created_at }) {
    
    const timeAgo = formatDistanceToNow(new Date(created_at), { addSuffix: true });
    
    return (
        <section className="article-card">
            <img
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            />
            <div className="article-card-content">
            <h2>{title}</h2>
            <p>⏲️{timeAgo}  |  {topic}</p>
            </div>
        </section>
    );
}