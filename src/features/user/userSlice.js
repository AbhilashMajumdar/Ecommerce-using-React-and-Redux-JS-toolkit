import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrdersByUserId, fetchUserData, updateUserInfo } from "./userAPI";

const initialState = {
  userInfo: null,
  status: "idle",
  userOrder: []
};

export const fetchUserDataAsync = createAsyncThunk(
  "user/fetchUserData",
  async (userId) => {
    const response = await fetchUserData(userId);
    return response.data;
  }
);

export const updateUserInfoAsync = createAsyncThunk(
  "user/updateUserInfo",
  async (userData) => {
    const response = await updateUserInfo(userData);
    return response.data;
  }
);

export const fetchOrdersByUserIdAsync = createAsyncThunk(
  'order/fetchOrdersByUserId',
  async (userId) => {
    const response = await fetchOrdersByUserId(userId);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(updateUserInfoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserInfoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userInfo = action.payload;
      })
      .addCase(fetchOrdersByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userOrder = action.payload;
      });
  },
});

// export const {  } = counterSlice.actions;
export const selectUserOrders = (state) => state.user.userOrder;
export const selectUserInfo = (state) => state.user.userInfo;
export default userSlice.reducer;
