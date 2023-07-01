import { createAction } from '@reduxjs/toolkit';

const ADD_TO_CART = 'ADD_TO_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const EMPTY_CART = 'EMPTY_CART';

export const addToCart = createAction(ADD_TO_CART);
export const removeFromCart = createAction(REMOVE_FROM_CART);
export const emptyCart = createAction(EMPTY_CART);
