import { configureStore, createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: '',
    isAuthenticaded: false,
  },
  reducers: {
    authenticate: (state, action) => {
      state.token = action.payload.token;
      state.isAuthenticaded = true;
      console.log('isAuth  ok');
    },
    logout: (state, action) => {
      (state.token = ''), (state.isAuthenticaded = false);
    },
  },
});

export const authStore = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export const { authenticate, logout } = authSlice.actions;

export default authStore;
