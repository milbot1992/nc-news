import "./App.css";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import UserSelection from "./components/UserSelection";
import PathNotFound from "./components/PathNotFound";
import ArticleNotFound from "./components/ArticleNotFound";
import TopicNotFound from "./components/TopicNotFound";
import { UserContext } from './contexts/UserContext'
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./components/UserProfile";
import { Routes, Route, } from "react-router-dom";

function App() {
  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    const storedUser = localStorage.getItem('selectedUser');
    if (storedUser) {
        setUser(JSON.parse(storedUser));
    }
  }, [user])

  return (
    <>
      <Link to={`/user`}>
        {user !== undefined ? (
          <img className = 'avatar-small-image' title="User Profile" src={user.avatar_url} alt="User Avatar" />
        ) : (
          <span>&nbsp;</span>
        )}
      </Link>
      <p className = 'top-banner1'>&nbsp;</p>
      <p className = 'top-banner2'>&nbsp;</p>
      <Header />
      <Nav />
      <div className = 'content-container'>
        <Routes>
          <Route path="/" element={<UserSelection/>} />
          <Route path="/news" element={<ArticleList topic="all" />} />
          <Route path="/news/:topic" element={<ArticleList />} />
          <Route path="/news/articles/:article_id" element={<SingleArticle />} />
          <Route path="/notfound/article" element={<ArticleNotFound />} />
          <Route path="/notfound/topic" element={<TopicNotFound />} />
          <Route path="/user" element={<UserProfile/>} />
          <Route path="*" element={<PathNotFound />} />
        </Routes>
      </div>
    </>
  );
}


export default App;
