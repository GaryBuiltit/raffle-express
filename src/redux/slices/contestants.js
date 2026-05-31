import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllContestants = (userId) => async (dispatch) => {
  await axios
    .post(`${import.meta.env.VITE_BACKEND_URL}/getAllContestants`, {
      user: userId,
    })
    .then((res) => {
      dispatch(setContestants(res.data));
    })
    .catch((err) => {
      console.log("getAllContestants error: ", err);
    });
};

const contestantsSlice = createSlice({
  name: "contestants",
  initialState: {
    contestants: null,
  },
  reducers: {
    setContestants: (state, action) => {
      state.contestants = action.payload;
    },
  },
});

export const { setContestants } = contestantsSlice.actions;
export default contestantsSlice.reducer;
