import {CategoryCredentials} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {fetchCategories} from './categoriesThunk';

export interface CategoryState {
  categories: CategoryCredentials[];
  categoriesFetching: boolean;
}

const initialState: CategoryState = {
  categories: [],
  categoriesFetching: false,
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.categoriesFetching = true;
      })
      .addCase(fetchCategories.fulfilled, (state, { payload: categories }) => {
        state.categoriesFetching = false;
        state.categories = categories;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.categoriesFetching = false;
      });
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectCategoriesFetching: (state) => state.categoriesFetching,
  },
});

export const categoriesReducer = categoriesSlice.reducer;
export const {
  selectCategories,
  selectCategoriesFetching
} = categoriesSlice.selectors;
