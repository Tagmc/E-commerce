import { createSlice, current } from "@reduxjs/toolkit";
import * as actions from './asyncAction';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    current: null,
    token: null,
    currentCart: [],
    mes: ''
  },
  reducers: {
    login: (state, action) => {
      //console.log(action);
      state.isLoggedIn = action.payload.isLoggedIn
      state.current = action.payload.userData
      state.token = action.payload.token
    },
    logout: (state, action) => {
      //console.log(action);
      state.isLoggedIn = false
      state.token = null
      state.current = null
    },
    updateCart: (state, action) => {
      const { pid, quantity, color } = action.payload;
      const updateCart = JSON.parse(JSON.stringify(state.currentCart));
      const updatedCart = updateCart.map(el => {
        if (el.color === color && el.product?._id === pid) {
          return { ...el, quantity };
        }
        else {
          return el;
        }
      });
      state.currentCart = updatedCart;

    }
  },
  //code logic xử lý async action
  extraReducers: (builder) => {
    builder.addCase(actions.getCurrent.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.current = action.payload;
      state.isLoggedIn = true;
      state.currentCart = action.payload.cart;
    });

    builder.addCase(actions.getCurrent.rejected, (state, action) => {
      state.isLoading = false;
      state.current = null;
      state.isLoggedIn = false;
      state.token = null;
    })
  }
});

export const { login, logout, updateCart } = userSlice.actions;

export default userSlice.reducer