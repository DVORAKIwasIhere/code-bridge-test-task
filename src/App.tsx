import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Article } from './pages/Article'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/article/:articleId" element={<Article />} />
      </Routes>
    </div>
  );
};

export default App;
