import { removeItem } from "@/utils/storage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  _id: string;
  phoneNumber: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
}

interface AuthState {
  user: {
    data: User | null;
  };
  sessionToken: string | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {
    data: null,
  },
  sessionToken: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user.data = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user.data = null;
      state.isAuthenticated = false;
      state.sessionToken = null;
      removeItem("sessionToken");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSessionToken(state, action: PayloadAction<string | null>) {
      state.sessionToken = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
});

export const { login, logout, setError, setLoading, setSessionToken } =
  userSlice.actions;

export default userSlice.reducer;
