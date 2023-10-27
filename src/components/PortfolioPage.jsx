import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { Link  } from "react-router-dom";
import "../Single-article.css";
import ArticleImage from '../assets/Article1.jpg'
import pageInfo from '../assets/PageInfo.json'

export default function PortfolioPage() {
    let timeAgo = "";
    if (Date.parse(pageInfo.created_at)) {
        timeAgo = formatDistanceToNow(new Date(pageInfo.created_at), { addSuffix: true });
    }

    return (
        <>
        <Link to="/news" className="back-button">
            &laquo;
        </Link>
        <div className="single-article-info">
            <p className="author">{pageInfo.author}</p>
            <p className="time-ago">{timeAgo}</p>
        </div>
        <h2>{pageInfo.title}</h2>
        <div className = 'topic-container'>
        <Link to={`/news/${pageInfo.topic}`} className="topic-tag">
            <p className="topic-tag">{pageInfo.topic}</p>
        </Link>
        </div>
        <img
            className="single-article-image"
            src={ArticleImage}
            alt={`a photo to depict the article: ${pageInfo.title}`}
            id="medium-image"
        />
        <p className="portfolio-article-body">In my full-stack portfolio piece, I've developed a robust and versatile RESTful API designed for a news application. This API allows requests to retrieve, post, update, and delete critical information from articles.</p>
        <p className="portfolio-article-body">To create this API, I used Node.js, PostgreSQL, Express.js, and Git for version control. I also used ElephantSQL to configure my database and Render for hosting my app. I followed Test-Driven Development (TDD) practices and also established a reliable Continuous Integration/Continuous Deployment (CI/CD) pipeline for the API, ensuring seamless deployment and updates. You can explore the API repository <a className='portfolio-links' href="https://github.com/milbot1992/backend-news">here</a> and experience the live API <a className='portfolio-links' href="https://news-api-905c.onrender.com/api/articles?p=3&limit=4">here</a>.</p>
        <p className="portfolio-article-body">The API offers GET endpoints for topics, articles, comments, and users, seamlessly fetching data from a PostgreSQL relational database. This data is linked with joining tables, streamlining requests into a single, efficient database call. Users can further refine their queries using URL parameters, such as topic filtering and sorting by different fields. Additionally, the API provides POST, PATCH, and DELETE endpoints, enabling actions like posting comments, voting on articles, and deleting comments.</p>
        <p className="portfolio-article-body">Complementing the backend, the frontend of this project is a dynamic Single Page Application built using React. This interactive interface provides an engaging and intuitive user experience, seamlessly connecting with the backend to deliver a comprehensive news application.</p>
        </>
    );
}
