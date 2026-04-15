import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import BlogArticlePage from './pages/BlogArticlePage.jsx';
import QuizPage from './pages/QuizPage.jsx';
import RewardsPage from './pages/RewardsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/blog/:slug" element={<BlogArticlePage />} />
                <Route path="/quiz" element={<QuizPage />} />
                <Route path="/rewards" element={<RewardsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Route>
        </Routes>
    );
}
