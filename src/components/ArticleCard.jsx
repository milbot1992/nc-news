export default function ArticleCard({ title, article_img_url, topic, created_at }) {
    return (
        <section className="article-card">
            <img
            src={article_img_url}
            alt={`a photo to depict the article: ${title}`}
            />
            <div className="article-content">
            <h2>{title}</h2>
            <p>{created_at}  |  {topic}</p>
            </div>
        </section>
    );
}