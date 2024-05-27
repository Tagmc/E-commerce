import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as actions from './asyncAction';


export const appSlice = createSlice({
  name: 'app',
  initialState: {
    categories: null,
    isLoading: false,
    errorMessage: '',
    isShowCart: false

  },
  reducers: {
    showCart: (state, action) => {
      state.isShowCart = state.isShowCart === false ? true : false
    }
  },
  //code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getCategories.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(actions.getCategories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(actions.getCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.message;
    })
  }
});

export const { showCart } = appSlice.actions;

export default appSlice.reducer