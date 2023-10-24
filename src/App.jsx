import "./App.css";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";
import SingleArticle from "./components/SingleArticle";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <div className = 'content-container'>
        <Routes>
          <Route path="/news" element={<ArticleList topic="all" />} />
          <Route path="/news/coding" element={<ArticleList topic="coding" />} />
          <Route path="/news/football" element={<ArticleList topic="football" />} />
          <Route path="/news/cooking" element={<ArticleList topic="cooking" />} />
          <Route path="/news/:article_id" element={<SingleArticle />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
