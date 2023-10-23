"use client"

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  headline: "",
  bio: "",
  categories: [],
  website: "",
  interviews: [],
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  },
  prefers: [],
  nextRec: {
    date: "",
    detail: "",
    time: ""
  },
  info: {
    age: "",
    gender: "",
    country: "",
    city: "",
    language: ""
  },
  podcast: "",
  recording: null,
  contact_me: null,
  image: ""
}

export const podcasterSlice = createSlice({
  name: "podcaster",
  initialState,
  reducers: {
    setName: (state, action) => {
      state = { ...state, name: action.payload }
      return state
    },
    setHeadline: (state, action) => {
      state = { ...state, headline: action.payload }
      return state
    },
    setBio: (state, action) => {
      state = { ...state, bio: action.payload }
      return state
    },
    setCategory: (state, action) => {
      state = { ...state, categories: action.payload }
      return state
    },
    setWebsite: (state, action) => {
      state = { ...state, website: action.payload }
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
    setNextRec: (state, action) => {
      state = { ...state, nextRec: action.payload }
      return state
    },
    setDate: (state, action) => {
      state = { ...state, nextRec: { ...state.nextRec, date: action.payload } }
      return state
    },
    setDetails: (state, action) => {
      state = { ...state, nextRec: { ...state.nextRec, detail: action.payload } }
      return state
    },
    setTime: (state, action) => {
      state = { ...state, nextRec: { ...state.nextRec, time: action.payload } }
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
    setPodcast: (state, action) => {
      state = { ...state, podcast: action.payload }
      return state
    },
    setRecording: (state, action) => {
      state = { ...state, recording: action.payload }
      return state
    },
    setContact: (state, action) => {
      state = { ...state, contact_me: action.payload }
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
  setCategory,
  setCity,
  setContact,
  setCountry,
  setDate,
  setDetails,
  setFacebook,
  setGender,
  setHeadline,
  setImage,
  setInfo,
  setInstagram,
  setInterviews,
  setLanguage,
  setLinkedin,
  setName,
  setNextRec,
  setPodcast,
  setPrefers,
  setRecording,
  setSocial,
  setTime,
  setTwitter,
  setWebsite,
  setYoutube,
} = podcasterSlice.actions

export default podcasterSlice.reducer