import {ProductCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchProducts} from './productsThunk';

export interface ProductsState {
  products: ProductCredentials[];
  productsFetching: boolean;
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.productsFetching = true;
      })
      .addCase(fetchProducts.fulfilled, (state, {payload: products}) => {
        state.productsFetching = false;
        state.products = products;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.productsFetching = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.products,
    selectProductsFetching: (state) => state.productsFetching,
  }
});


export const productsReducer = productsSlice.reducer;

export const {
  selectProducts,
  selectProductsFetching,
} = productsSlice.selectors;