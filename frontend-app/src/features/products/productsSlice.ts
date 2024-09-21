import {ProductCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {addProduct, fetchOneProduct, fetchProducts} from './productsThunk';

export interface ProductsState {
  products: ProductCredentials[];
  productsFetching: boolean;
  productsCreating: boolean;
  oneProduct: ProductCredentials | null;
  oneProductFetching: boolean;
}

const initialState: ProductsState = {
  products: [],
  productsFetching: false,
  productsCreating: false,
  oneProduct: null,
  oneProductFetching: false,
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
    builder
      .addCase(addProduct.pending, (state) => {
        state.productsCreating = true;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.productsCreating = false;
      })
      .addCase(addProduct.rejected, (state) => {
        state.productsCreating = false;
      });
    builder
      .addCase(fetchOneProduct.pending, (state) => {
        state.oneProduct = null;
        state.oneProductFetching = true;
      })
      .addCase(fetchOneProduct.fulfilled, (state, { payload: product }) => {
        state.oneProduct = product;
        state.oneProductFetching = false;
      })
      .addCase(fetchOneProduct.rejected, (state) => {
        state.oneProductFetching = false;
      });
  },
  selectors: {
    selectProducts: (state) => state.products,
    selectProductsFetching: (state) => state.productsFetching,
    selectProductsCreating: (state) => state.productsCreating,
    selectOneProduct: (state) => state.oneProduct,
    selectOneProductFetching: (state) => state.oneProductFetching,
  }
});


export const productsReducer = productsSlice.reducer;

export const {
  selectProducts,
  selectProductsFetching,
  selectProductsCreating,
  selectOneProduct,
  selectOneProductFetching
} = productsSlice.selectors;