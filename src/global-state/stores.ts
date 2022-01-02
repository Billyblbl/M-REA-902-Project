import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user';

const userStore = configureStore({ reducer: userReducer });

export default userStore;
