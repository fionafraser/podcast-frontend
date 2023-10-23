"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  headline: "",
  bio: "",
  categories: [],
  interviews: [],
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
  prefers: [],
  mission: "",
  info: {
    age: "",
    gender: "",
    country: "",
    city: "",
    language: ""
  },
  own_podcast: null,
  image: ""
}

export const guestSlice = createSlice({
  name: "guest",
  initialState,
  reducers: {
    setHeadline: (state, action) => {
      state = { ...state, headline: action.payload }
      return state
    },
    setBio: (state, action) => {
      state = { ...state, bio: action.payload }
      return state
    },
    setCategories: (state, action) => {
      state = { ...state, categories: action.payload }
      return state
    },
    setInterviews: (state, action) => {
      state = { ...state, interviews: action.payload }
      return state
    },
    setMission: (state, action) => {
      state = { ...state, mission: action.payload }
      return state
    },
    setInterviews: (state, action) => {
      state = { ...state, interviews: action.payload }
      return state
    },
    setSocial: (state, action) => {
      state = { ...state, social: action.payload }
      return state
    },
    setFacebook: (state, action) => {
      state = { ...state, social: { ...state.social, facebook: action.payload } }
      return state
    },
    setInstagram: (state, action) => {
      state = { ...state, social: { ...state.social, instagram: action.payload } }
      return state
    },
    setLinkedin: (state, action) => {
      state = { ...state, social: { ...state.social, linkedin: action.payload } }
      return state
    },
    setTwitter: (state, action) => {
      state = { ...state, social: { ...state.social, twitter: action.payload } }
      return state
    },
    setYoutube: (state, action) => {
      state = { ...state, social: { ...state.social, youtube: action.payload } }
      return state
    },
    setPrefers: (state, action) => {
      state = { ...state, prefers: action.payload }
      return state
    },
    setInfo: (state, action) => {
      state = { ...state, info: action.payload }
      return state
    },
    setAge: (state, action) => {
      state = { ...state, info: { ...state.info, age: action.payload } }
      return state
    },
    setCity: (state, action) => {
      state = { ...state, info: { ...state.info, city: action.payload } }
      return state
    },
    setCountry: (state, action) => {
      state = { ...state, info: { ...state.info, country: action.payload } }
      return state
    },
    setGender: (state, action) => {
      state = { ...state, info: { ...state.info, gender: action.payload } }
      return state
    },
    setLanguage: (state, action) => {
      state = { ...state, info: { ...state.info, language: action.payload } }
      return state
    },
    setOwnPodcast: (state, action) => {
      state = { ...state, own_podcast: action.payload }
      return state
    },
    setImage: (state, action) => {
      state = { ...state, image: action.payload }
      return state
    },
  }
})

export const {
  setAge,
  setBio,
  setCategories,
  setCity,
  setCountry,
  setFacebook,
  setGender,
  setHeadline,
  setImage,
  setInfo,
  setInstagram,
  setInterviews,
  setLanguage,
  setLinkedin,
  setMission,
  setOwnPodcast,
  setPrefers,
  setSocial,
  setTwitter,
  setYoutube,
} = guestSlice.actions

export default guestSlice.reducer