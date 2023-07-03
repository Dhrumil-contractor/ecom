import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { removeUser } from '../../../redux/user/actions';
import { useDispatch } from 'react-redux';
import { emptyCart } from '../../../redux/cart/actions';

const Navbar = () => {
  const cartState = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    // localStorage.setItem('user', null);
    dispatch(removeUser());
    dispatch(emptyCart());
    navigate('/login');
  };

  return (
    <nav className="flex justify-between p-3 bg-purple-700 text-white">
      <Link to="/dashboard">ecom</Link>
      <div className="flex justify-between gap-10">
        <div className="relative">
          <Link to="/cart">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
          </Link>
          {cartState?.cart?.length ? (
            <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 border-1 border-white rounded-full -top-2 -right-2">
              {cartState.cart.length}
            </div>
          ) : null}
        </div>
        <Link to="/profile">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </Link>
        <div className="cursor-pointer" onClick={handleLogout}>
          Logout
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
