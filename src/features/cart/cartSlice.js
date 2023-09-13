import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchItemsByUserId, removeCartItem, resetCartItems, updateCartItem } from './cartAPI';

const initialState = {
  cartItems: [],
  status: 'idle',
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (cartData) => {
    const response = await addToCart(cartData);
    return response.data;
  }
);

export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);

export const updateCartItemAsync = createAsyncThunk(
  'cart/updateCartItem',
  async (itemData) => {
    const response = await updateCartItem(itemData);
    return response.data;
  }
);

export const removeCartItemAsync = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId) => {
    const response = await removeCartItem(itemId);
    return response.data;
  }
);

export const resetCartItemsAsync = createAsyncThunk(
  'cart/resetCartItems',
  async (userId) => {
    const response = await resetCartItems(userId);
    return response.data;
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = action.payload;
      })
      .addCase(updateCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = state.cartItems.map(item => item.id === action.payload.id ? action.payload : item);
      })
      .addCase(removeCartItemAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(removeCartItemAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      })
      .addCase(resetCartItemsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartItemsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.cartItems = [];
      });
  },
});

// export const {  } = counterSlice.actions;
export const selectCartItems = (state) => state.cart.cartItems;
export default cartSlice.reducer;
