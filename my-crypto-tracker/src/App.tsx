import { Routes, Route } from 'react-router-dom';
// pages
import HomePage from './pages/HomePage';
import FavoritePage from './pages/FavoritePage';
import NotFoundPage from './pages/NotFoundPage';
import NewsPage from './pages/NewsPage';

// components
import Header from './components/Header';

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritePage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
