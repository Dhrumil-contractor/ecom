import { createAction } from '@reduxjs/toolkit';

const ADD_USER_INFO = 'ADD_USER_INFO';
const REMOVE_USER_INFO = 'REMOVE_USER_INFO';

export const addUser = createAction(ADD_USER_INFO);
export const removeUser = createAction(REMOVE_USER_INFO);
