import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom'
import { getTopics } from '../api';

export default function Nav () {
    const [topics, setTopics] = useState([]);
    const location = useLocation()

    const isWelcomePage = location.pathname === '/'
    const isHomeActive = location.pathname === '/news'

    useEffect(() => {
        getTopics()
            .then((data) => {
                setTopics(data);
            })
            .catch((error) => {
                console.log('Error fetching topics:', error);
            });
        }, []);

    return (
        <nav>
            {!isWelcomePage ? (
            <ul>
                <li>
                    <NavLink 
                        to='/news'
                        activeclassname={isHomeActive ? 'active' : 'inactive'}
                    >
                        Home
                    </NavLink>
                </li>
                {topics.map((topic) => (
                    <li key={topic.slug}>
                        <NavLink 
                            to={`/news/${topic.slug}`}
                            activeclassname="active"
                        >
                            {topic.slug}
                        </NavLink>
                    </li>
                ))}
            </ul>
            ) : '' }
        </nav>
    )
}