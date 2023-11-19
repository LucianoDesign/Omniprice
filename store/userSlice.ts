import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  name: string;
  email: string;
  nickname: string;
  picture: string;
}

const initialState: User = {
  id: "",
  name: "",
  email: "",
  nickname: "",
  picture: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
  },
});
export const selectUser = (state: any) => state.user;
export const { saveUser } = userSlice.actions;
export default userSlice.reducer;
