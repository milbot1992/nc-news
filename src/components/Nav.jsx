import React, { useState, useEffect, Fragment } from 'react';
import {NavLink} from 'react-router-dom'
import { getTopics } from '../api';

export default function Nav () {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getTopics()
            .then((data) => {
                setTopics(data);
            })
            .catch((error) => {
                console.error('Error fetching topics:', error);
            });
        }, []);

    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/news'>Home</NavLink>
                </li>
                {topics.map((topic) => (
                    <li key={topic.slug}>
                        <NavLink to={`/news/${topic.slug}`}>{topic.slug}</NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    )
}