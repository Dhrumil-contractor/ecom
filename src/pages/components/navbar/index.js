import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between p-3 bg-purple-700 text-white">
      <Link>ecom</Link>
      <div className="flex justify-between gap-10">
        <Link>cart</Link>
        <Link>login</Link>
      </div>
    </nav>
  );
};
export default Navbar;
