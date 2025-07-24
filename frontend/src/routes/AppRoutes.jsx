import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import ProfilePage from '../pages/ProfilePage';
import AdminPanelPage from '../pages/AdminPanelPage';
import DocentePage from '../pages/DocentePage'; // <-- IMPORTANTE

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/admin" element={<AdminPanelPage />} />
        <Route path="/docente" element={<DocentePage />} /> {/* AGREGADO */}
      </Routes>
    </Router>
  );
}

