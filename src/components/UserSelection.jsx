import { useEffect, useContext, useState, Fragment } from "react";
import { UserContext } from '../contexts/UserContext'
import Loading from "./Loading";
import { getUsers } from "../api";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";
import '../User-selection.css'

export default function UserSelection() {
    const { user, setUser } = useContext(UserContext)
    const [userOptions, setUserOptions] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('selectedUser');

        if (storedUser) {
            setUser(storedUser);
        }

        getUsers()
        .then((users) => {
            setUserOptions(users);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }, []);

    const handleUserAssign = (selectedUser) => {
        setUser(selectedUser);
        console.log(selectedUser);
        localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
    }

    if (loading) return <Loading />;

    return (
        <>
        <h3 className='user-header'>Select User</h3>
        <p className='user-text'>Select your user from the list below to be taken to the news articles</p>
        <ul className='user-list'>
            {userOptions.map((user) => (
                <Fragment key={user.username}>
                <li>
                <Link to={`/news`} onClick={() => handleUserAssign(user)}>
                    <UserCard
                        username={user.username}
                        name={user.name}
                        avatar_url={user.avatar_url}
                    />
                </Link>
                </li>
                </Fragment>
            ))}
        </ul>
        </>
    )
}
