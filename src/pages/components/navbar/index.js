import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartState = useSelector((state) => state.cart);

  return (
    <nav className="flex justify-between p-3 bg-purple-700 text-white">
      <Link to="/">ecom</Link>
      <div className="flex justify-between gap-10">
        <div className="relative">
          <Link to="/cart">cart</Link>
          {cartState?.cart?.length ? (
            <div class="absolute inline-flex items-center justify-center w-4 h-4 text-xs text-white bg-orange-500 border-1 border-white rounded-full -top-2 -right-2">
              {cartState.cart.length}
            </div>
          ) : null}
        </div>
        <Link to="/login">login</Link>
      </div>
    </nav>
  );
};
export default Navbar;
