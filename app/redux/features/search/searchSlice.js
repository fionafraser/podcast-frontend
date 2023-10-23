"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searched: ""
}

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    updateSearch: (state, action) => {
      state = { ...state, searched: action.payload }
      return state
    }
  }
})

export const { updateSearch } = searchSlice.actions

export default searchSlice.reducer