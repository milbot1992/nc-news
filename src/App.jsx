import "./App.css";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";
import UserSelection from "./components/UserSelection";
import PathNotFound from "./components/PathNotFound";
import ArticleNotFound from "./components/ArticleNotFound";
import TopicNotFound from "./components/TopicNotFound";

import { Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <>
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
          <Route path="*" element={<PathNotFound />} />
        </Routes>
      </div>
    </>
  );
}


export default App;
