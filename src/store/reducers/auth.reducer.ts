import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  email: string | null;
  token: string | null;
}

// Define the initial state using that type
const initialState: AuthState = {
  email: null,
  token: null,
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authenticate: (
      state,
      action: PayloadAction<{
        email: string;
        token: string;
      }>
    ) => {
      state.email = action.payload.email;
      state.token = action.payload.token;
    },
    logout: (state, action: PayloadAction<void>) => {
      state.email = null;
      state.token = null;
    },
  },
});

export const { authenticate, logout } = authSlice.actions;
export default authSlice.reducer;
