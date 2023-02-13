import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';
import { Iimages } from '../../../features/models/IImg';
import { access, stat } from 'fs';
import { getImages,delImage } from './galAPI';

const initialState: Iimages = {
  images: [],
  upd: false
};

export const getImagesAsync = createAsyncThunk(
  'gal/getImages',
  async (access:string) => {
    const response = await getImages(access);
    return response.data;
  }
);
export const delImageAsync = createAsyncThunk(
  'gal/delImage',
  async (id:any) => {
    const response = await delImage(id);
    return response.data;
  }
);


export const galSlice = createSlice({
  name: 'gal',
  initialState,
  reducers: {
    setUpd:(state)=>{
      state.upd = !state.upd
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getImagesAsync.fulfilled, (state, action) => {
        console.log(action.payload)
        state.images=action.payload
      }).addCase(delImageAsync.fulfilled, (state, action) => {
        // state.images.filter(img=> action.payload !== img.id)
        state.upd = !state.upd
      });
  },
});

export const {setUpd } = galSlice.actions;
export const selectImages = (state: RootState) => state.gal.images;
export const selectUpd = (state: RootState) => state.gal.upd;
export default galSlice.reducer;