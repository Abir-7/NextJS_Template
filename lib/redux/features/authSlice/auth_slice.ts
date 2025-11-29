import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: null | { id: string; email: string; role: string };
  is_loading: boolean;
};

const initialState: AuthState = {
  user: null,
  is_loading: true,
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
    setIsLoading(state, action: PayloadAction<AuthState["is_loading"]>) {
      state.is_loading = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setIsLoading } = authSlice.actions;
export default authSlice.reducer;
