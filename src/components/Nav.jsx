import {NavLink} from 'react-router-dom'

export default function Nav () {
    return (
        <nav>
            <ul>
                <li>
                    <NavLink to='/news'>Home</NavLink>
                </li>
                <li>
                    <NavLink to='/news/coding'>Coding</NavLink>
                </li>
                <li>
                    <NavLink to='/news/football'>Football</NavLink>
                </li>
                <li>
                    <NavLink to='/news/cooking'>Cooking</NavLink>
                </li>
            </ul>
        </nav>
    )
}