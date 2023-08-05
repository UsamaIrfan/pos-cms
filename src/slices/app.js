import { createSlice } from '@reduxjs/toolkit';
import { THEME_OPTIONS } from '@utils/enums';

// const darkThemItem TypeeMq = window.matchMedia('(prefers-color-scheme: dark)');
const initialState = {
  theme: THEME_OPTIONS.LIGHT,
};

export const app = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      localStorage.setItem('proxcure-theme', action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = app.actions;

export default app.reducer;
