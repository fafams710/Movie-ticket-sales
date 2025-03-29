import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [
      { id: 1, title: 'Product Title 1', price: '$5 ticket', imageUrl: '/dog.jpg' },
      { id: 2, title: 'Product Title 2', price: '$5 ticket', imageUrl: '/cat.jpg' },
    ],
    cart: [],
  },
  reducers: {
    addProduct: (state, action) => {
      state.cart.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.cart = state.cart.filter(product => product.id !== action.payload.id);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export const selectProducts = (state) => state.products.items;
export const selectCart = (state) => state.products.cart;
export default productSlice.reducer;