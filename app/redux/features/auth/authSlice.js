"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  access_token: "",
  email: ""
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateToken: (state, action) => {
      state = { ...state, access_token: action.payload }
      return state
    },
    updateEmail: (state, action) => {
      state = { ...state, email: action.payload }
      return state
    }
  }
})

export const { updateEmail, updateToken } = authSlice.actions

export default authSlice.reducer