import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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

const PageRoutes = () => {
  const user = useSelector((state) => state.user.user);

  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    setIsSignedIn(Boolean(user?.token));
  }, [user]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Redirect to="/dashboard" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Dashboard />
            </Protected>
          }
        />
        <Route
          path="/cart"
          element={
            <Protected isSignedIn={isSignedIn}>
              <Cart />
            </Protected>
          }
        />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
