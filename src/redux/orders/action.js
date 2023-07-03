import { createAction } from '@reduxjs/toolkit';

const CREATE_ORDER = 'CREATE_ORDER';
const CLEAR_ORDERS = 'CLEAR_ORDERS';

export const createOrder = createAction(CREATE_ORDER);
export const clearOrders = createAction(CLEAR_ORDERS);
