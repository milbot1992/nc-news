import "./App.css";
import Header from "./components/Header.jsx";
import Nav from "./components/Nav";
import ArticleList from "./components/ArticleList";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<ArticleList topic="all" />} />
        <Route path="/coding" element={<ArticleList topic="coding" />} />
        <Route path="/football" element={<ArticleList topic="football" />} />
        <Route path="/cooking" element={<ArticleList topic="cooking" />} />
      </Routes>
    </>
  );
}

export default App;
