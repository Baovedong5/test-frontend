import { createSlice } from "@reduxjs/toolkit";

export interface IState {
  isAuthenticated: boolean;
  user: {
    _id: string;
    name: string;
    role: string;
  };
}

const initialState: IState = {
  isAuthenticated: false,
  user: {
    _id: "",
    name: "",
    role: "",
  },
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserLoginInfo: (state, action) => {
      state.isAuthenticated = true;
      state.user._id = action?.payload?._id;
      state.user.name = action?.payload?.name;
      state.user.role = action?.payload?.role;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserLoginInfo } = accountSlice.actions;

export default accountSlice.reducer;
