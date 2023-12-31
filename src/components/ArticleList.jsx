import ArticleCard from "./ArticleCard";
import { useEffect, useState, Fragment } from "react";
import { getArticles } from "../api.js";
import Loading from "./Loading";
import { Link, useParams, useNavigate } from "react-router-dom";
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardControlKeyIcon from '@mui/icons-material/KeyboardControlKey';
import PortfolioCard from "./PortfolioCard";

export default function ArticleList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const { topic } = useParams();
    const [sortBy, setSortBy] = useState("created_at");
    const [order, setOrder] = useState("desc");
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedPage, setSelectedPage] = useState(currentPage);
    const navigate = useNavigate();

    useEffect(() => {
        getArticles(topic, sortBy, order, currentPage)
        .then(({ articles, total_count }) => {
            const total_pages = Math.ceil(total_count/10)
            setArticles(articles);
            setTotalPages(total_pages);
            setLoading(false);

            let pathSortBy;
            if (sortBy === 'created_at') {
                pathSortBy = 'date';
            } else {
                pathSortBy = sortBy;
            }
            navigate(`?sort_by=${pathSortBy}&&order=${order}&page=${currentPage}`);
        })
        .catch((err) => {
            if (err.response && err.response.status === 404) {
                navigate('/notfound/topic');
            } else {
                console.log(err);
            }
        });
    }, [topic, sortBy, order, currentPage]);

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        if (name === 'sortBy') {
            setSortBy(value);
        } else if (name === 'order') {
            setOrder(value);
        }
    };

    const toggleSortOptions = () => {
        setShowSortOptions(!showSortOptions);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        setSelectedPage(newPage);
    };

    if (loading) return <Loading />;
    
    return (
        <div className="article-list-container">
            <div className="left-pane">
                <button className='sort-options-button' onClick={toggleSortOptions}>
                    {showSortOptions ? <KeyboardControlKeyIcon /> : (
                        <>
                            Sort &nbsp;<TuneIcon />
                        </>
                    )}
                </button>
                {showSortOptions && (
                    <div className="sort-options">
                        <label>
                            Sort By:&nbsp;
                            <select name="sortBy" value={sortBy} onChange={handleSortChange}>
                                <option value="created_at">Date</option>
                                <option value="comment_count">Comment Count</option>
                                <option value="votes">Votes</option>
                            </select>
                        </label>
                        <label>
                            Order:&nbsp;&nbsp;&nbsp;
                            <select name="order" value={order} onChange={handleSortChange}>
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </label>
                    </div>
                )}
            </div>
            <div className="right-pane">
                <h2>Latest News</h2>
                <p>&nbsp;&nbsp;Browse through articles below</p>
                <Link to={`/portfolio`}>
                    <PortfolioCard />
                </Link>
                <ul className="article-list">
                    {articles.map(
                        ({
                                article_id,
                                title,
                                article_img_url,
                                topic,
                                created_at,
                                comment_count,
                                votes,
                        }) => (
                            <Fragment key={article_id}>
                                <li>
                                    <Link to={`/news/articles/${article_id}`}>
                                        <ArticleCard
                                            title={title}
                                            article_img_url={article_img_url}
                                            topic={topic}
                                            created_at={created_at}
                                            comment_count={comment_count}
                                            votes={votes}
                                        />
                                    </Link>
                                </li>
                            </Fragment>
                        )
                    )}
                </ul>
                <div className="pagination">
                    {[...Array(totalPages).keys()].map((page) => (
                        <button
                            key={page + 1}
                            onClick={() => handlePageChange(page + 1)}
                            className={page + 1 === selectedPage ? 'selected-page' : ''}
                        >
                            {page + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
