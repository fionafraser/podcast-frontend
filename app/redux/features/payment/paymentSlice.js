"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cardName: "",
  cardNumber: "",
  monthYear: "2023-10",
  cvc: "",
}

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    updateCardName: (state, action) => {
      state = { ...state, cardName: action.payload }
      return state
    },
    updateCardNumber: (state, action) => {
      state = { ...state, cardNumber: action.payload }
      return state
    },
    updateMonthYear: (state, action) => {
      state = { ...state, monthYear: action.payload }
      return state
    },
    updateCVC: (state, action) => {
      state = { ...state, cvc: action.payload }
      return state
    }
  }
})

export const {
  updateCardName,
  updateCardNumber,
  updateCVC,
  updateMonthYear
} = paymentSlice.actions

export default paymentSlice.reducer