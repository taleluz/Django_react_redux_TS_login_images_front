import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import Icred from '../../models/Cred';
import { login } from './loginAPI';
import jwt_decode from "jwt-decode";

export interface LoginState {
 looged : boolean
 access : string
 username:string
}

const initialState: LoginState = {
  looged: false,
  access: '',
  username: ''
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred: Icred) => {
    const response = await login(cred);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.looged = false;
      state.access = ''
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
      state.looged = true
      //  console.log(action.payload)
       state.access = action.payload.access
       console.log(state.access)
      // jwt_decode -  packege that enables access to pablic token part (can be seen at jwt_decode site)
       state.username = jwt_decode<any>(state.access).username
      })
  },
});

export const { logout } = loginSlice.actions;

export const selectLooged = (state: RootState) => state.login.looged;
export const selectAccess = (state: RootState) => state.login.access;
export const selectUsername = (state: RootState) => state.login.username;


export default loginSlice.reducer;