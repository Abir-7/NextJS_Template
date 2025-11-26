import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: null | { id: string; email: string };
};

const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState["user"]>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
