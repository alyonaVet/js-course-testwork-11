import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {CategoryCredentials} from '../../types';

export const fetchCategories = createAsyncThunk('categories/fetchAll', async () => {
  const { data: categories } = await axiosApi.get<CategoryCredentials[]>('/categories');
  return categories;
});
