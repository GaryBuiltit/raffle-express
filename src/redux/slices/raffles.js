import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getRaffles = (userId) => async (dispatch) => {
  const response = await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/getAllRaffles`, {
      user: userId,
    })
    .then((res) => {
      dispatch(setRaffles(res.data));
    })
    .catch((err) => {
      console.log("getRaffles error: ", err);
      dispatch(setRaffles(null));
    });
};

export const getRaffle = (rafflePin) => async (dispatch) => {
  const response = await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/getRaffle`, {
      rafflePin: rafflePin,
    })
    .then((res) => {
      dispatch(setRaffle(res.data));
    })
    .catch((err) => {
      console.log("getRaffle error: ", err);
      dispatch(setRaffle(null));
    });
};

const rafflesSlice = createSlice({
  name: "raffles",
  initialState: {
    raffles: null,
    raffle: null,
  },
  reducers: {
    setRaffles: (state, action) => {
      state.raffles = action.payload;
    },
    setRaffle: (state, action) => {
      state.raffle = action.payload;
    },
  },
});

export const { setRaffles, setRaffle } = rafflesSlice.actions;
export default rafflesSlice.reducer;
