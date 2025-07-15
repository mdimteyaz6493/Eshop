import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: { token: localStorage.getItem('userToken') || null, name: null },
  reducers: {
    setUser: (s, a) => {
      s.token = a.payload.token;
      s.name = a.payload.name;
      localStorage.setItem('userToken', a.payload.token);
    },
    logout: s => {
      s.token = null;
      s.name = null;
      localStorage.removeItem('userToken');
    },
  },
});
export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
