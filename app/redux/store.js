"use client"

import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/authSlice';
import searchSlice from './features/search/searchSlice';
import podcasterSlice from './features/podcaster/podcasterSlice';
import guestSlice from './features/guest/guestSlice';
import paymentSlice from './features/payment/paymentSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    search: searchSlice,
    podcaster: podcasterSlice,
    guest: guestSlice,
    payment: paymentSlice
  },
})