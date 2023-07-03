import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated } from './helpers/authHelper';
import Login from './pages/auth/login';
import Cart from './pages/cart';
import Dashboard from './pages/dashboard';
import Profile from './pages/auth/profile';

const Redirect = ({ to }) => {
  let navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  });
  return null;
};

const Protected = ({ isSignedIn, children }) => {
  if (!isSignedIn) return <Navigate to="/login" replace />;
  return children;
};

const PageRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Redirect to="/dashboard" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <Protected isSignedIn={isAuthenticated()}>
            <Dashboard />
          </Protected>
        }
      />
      <Route
        path="/cart"
        element={
          <Protected isSignedIn={isAuthenticated()}>
            <Cart />
          </Protected>
        }
      />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
);

export default PageRoutes;
