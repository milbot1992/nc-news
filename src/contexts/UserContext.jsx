import { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    
    useEffect(() => {
        const username = localStorage.getItem("username");
        const avatar_url = localStorage.getItem("userImg");
        setUser({ username, avatar_url });
    }, []);

    return (
        <UserContext.Provider value = {{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}