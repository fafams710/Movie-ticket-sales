import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../api/axios';

export const createPaymentIntent = createAsyncThunk(
  'payment/createIntent',
  async (amount) => {
    const response = await axios.post('/payments/create-intent/', { amount });
    return response.data;
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    clientSecret: null,
    status: 'idle',
    error: null
  },
  reducers: {
    resetPayment: (state) => {
      state.clientSecret = null;
      state.status = 'idle';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentIntent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPaymentIntent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.clientSecret = action.payload.clientSecret;
      })
      .addCase(createPaymentIntent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const { resetPayment } = paymentSlice.actions;
export default paymentSlice.reducer;