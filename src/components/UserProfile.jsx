import { UserContext } from '../contexts/UserContext';
import { useContext, useEffect, useState, Fragment } from 'react';
import { getArticles } from '../api';
import Loading from './Loading';
import { Link } from 'react-router-dom';
import UserArticleCard from './UserArticleCard';

export default function UserProfile() {
    const { user, setUser } = useContext(UserContext);
    const [userArticles, setUserArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getArticles()
            .then(({ articles }) => {
                const userArticlesFiltered = articles.filter((article) => article.author === user.username);
                setUserArticles(userArticlesFiltered);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching articles:', error);
                setLoading(false);
            });
    }, [user]); 

    if (loading) return <Loading />;

    return (
        <>
            <h2 className='user-header'>{user.username}</h2>
            <h3 className='user-sub-header'>Articles that you have posted:</h3>
            {userArticles.length === 0 
                ? <p className='no-articles-posted'>No articles posted</p>
                : <ul className="user-articles">
                    {userArticles.map(
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
                                        <UserArticleCard
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
            }
        </>
    );
}
