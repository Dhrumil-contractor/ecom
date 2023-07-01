import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './pages/auth/login';
import Dashboard from './pages/dashboard';

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

const PageRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Redirect to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>
);

export default PageRoutes;
