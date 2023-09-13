import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  fetchAllOrders,
  removeOrder,
  updateOrder,
} from "./orderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  totalOrders: 0
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (amount) => {
    const response = await createOrder(amount);
    return response.data;
  }
);

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async ({sort, pagination}) => {
    const response = await fetchAllOrders(sort, pagination);
    return response.data;
  }
);

export const removeOrderAsync = createAsyncThunk(
  "order/removeOrder",
  async (orderId) => {
    const response = await removeOrder(orderId);
    return response.data;
  }
);

export const updateOrderAsync = createAsyncThunk(
  "order/updateOrder",
  async (order) => {
    const response = await updateOrder(order);
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetCurrentOrder: (state, action) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(fetchAllOrdersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalOrders = action.payload.totalOrders;
      })
      .addCase(removeOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(removeOrderAsync.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload.id
        );
      })
      .addCase(updateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrderAsync.fulfilled, (state, action) => {
        state.orders = state.orders.map((order) =>
          order.id === action.payload.id ? action.payload : order
        );
      });
  },
});

export const { resetCurrentOrder } = orderSlice.actions;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectAllOrders = (state) => state.order.orders;
export const selectTotalOrders= (state) => state.order.totalOrders;


export default orderSlice.reducer;
