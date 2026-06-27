import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.js';
import ScrollToTop from './components/ScrollToTop.js';
import PublicLayout from './components/PublicLayout.js';
import ProtectedRoute from './components/ProtectedRoute.js';
import HomePage from './pages/HomePage.js';
import BlogListPage from './pages/BlogListPage.js';
import BlogPostPage from './pages/BlogPostPage.js';
import LoginPage from './pages/LoginPage.js';
import DashboardPage from './pages/DashboardPage.js';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <Routes>
          <Route element={<PublicLayout />}>
            <Route path='/' element={<HomePage />} />
            <Route path='/blog' element={<BlogListPage />} />
            <Route path='/blog/:slug' element={<BlogPostPage />} />
          </Route>
          <Route path='/admin/login' element={<LoginPage />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
