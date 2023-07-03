import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';
import { addUser } from '../../redux/user/actions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    if (user?.token) navigate('/');
  }, [user, navigate]);

  const handleChange = (e) => setCredentials((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

  const onLogin = async () => {
    setIsLoading(true);

    const userDetails = await Instance.post(Routes.auth.login, credentials)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));

    dispatch(addUser(userDetails));
    navigate('/');
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-2xl lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 uppercase">Sign in</h1>
        <form className="mt-6">
          <div className="mb-2">
            <label for="username" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label for="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-6 mb-6">
            <button
              type="button"
              onClick={onLogin}
              disabled={isLoading}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
