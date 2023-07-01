import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { isAuthenticated } from './helpers/authHelper';
import Login from './pages/auth/Login';
import Dashboard from './pages/dashboard';

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
    </Routes>
  </BrowserRouter>
);

export default PageRoutes;
