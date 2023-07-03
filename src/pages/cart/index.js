import React, { useEffect, useState } from 'react';
import App from '../../App';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartModal from './CartModal';
import { emptyCart, removeFromCart } from '../../redux/cart/actions';
import { useDispatch } from 'react-redux';

const Cart = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [productForPDF, setProductForPDF] = useState([]);

  const { cart: products } = useSelector((state) => state.cart);

  const total = products.reduce((total, item) => (total += item.price), 0);

  useEffect(() => {
    if (!open) setProductForPDF([...products]);
  }, [open, products]);

  useEffect(() => {
    if (open) dispatch(emptyCart());
  }, [open, dispatch]);

  const removeItemFromCart = (id) => dispatch(removeFromCart(id));

  return (
    <App>
      <CartModal
        open={open}
        setOpen={setOpen}
        products={productForPDF}
        total={productForPDF.reduce((total, item) => (total += item.price), 0)}
      />
      <div className="mt-8 flex justify-center">
        <div className="flow-root w-11/12 md:w-2/5">
          <ul className="-my-6 divide-y divide-gray-200">
            {products.map((product) => (
              <li key={product.id} className="flex py-6">
                <div className="h-24 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={product.thumbnail}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a href={product.href}>{product.title}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <p>&#8377; {product.price}</p>
                    <div className="flex">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() => removeItemFromCart(product.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {products.length ? (
            <div className="border-t border-gray-200 w-full mt-5">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>&#8377; {total}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <p
                  onClick={() => setOpen((prev) => !prev)}
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
                >
                  Checkout
                </p>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500 mb-10">
                <p>
                  or&nbsp;
                  <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">Cart is empty !!</div>
          )}
        </div>
      </div>
    </App>
  );
};

export default Cart;
