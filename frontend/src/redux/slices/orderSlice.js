// orderSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async () => {
    const response = await fetch('/api/orders'); // Adjust to your API endpoint
    return response.json();
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    status: 'idle',  // Can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orders = action.payload;  // Assuming the response contains the orders
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
