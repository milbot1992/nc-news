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
import { useContext, useState } from "react";
import UserProfile from "./components/UserProfile";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import PortfolioPage from "./components/PortfolioPage";
import UserPopup from "./components/UserPopup.jsx";

function App() {
  const { user, setUser } = useContext(UserContext)
  const [showUserPopup, setShowUserPopup] = useState(false);
  const navigate = useNavigate();


  const location = useLocation()

  const isWelcomePage = location.pathname === '/login'

  const handleUserPopupToggle = () => {
    setShowUserPopup(!showUserPopup);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
    setShowUserPopup(!showUserPopup);
  };

  const handleUserProfile = () => {
    navigate('/user');
    setShowUserPopup(!showUserPopup);
  }

  return (
    <>
      {!isWelcomePage ? (
      <>
        <div onClick={handleUserPopupToggle}>
          {user !== undefined ? (
            <img className="avatar-small-image" title="User Profile" src={user.avatar_url} alt="User Avatar" />
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        {showUserPopup && (
          <UserPopup onClose={handleUserProfile} onLogout={handleLogout} />
        )}
      </>
      ) : '' }
      <p className = 'top-banner1'>&nbsp;</p>
      <p className = 'top-banner2'>&nbsp;</p>
      <Header />
      <Nav />
      <div className = 'content-container'>
        <Routes>
          <Route path="/login" element={<UserSelection/>} />
          <Route path="/portfolio" element={<PortfolioPage/>} />
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
