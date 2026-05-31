import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getUser =
  ({ clerkId, email, name, userName, firstName, lastName }) =>
  async (dispatch) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/getUser`,
        { clerkId, email, name, userName, firstName, lastName }
      );
      dispatch(setUser(res.data));
    } catch (err) {
      console.log("getUser error: ", err);
      dispatch(setUser(null));
    }
  };

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
