import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {ProductCredentials} from '../../types';

export const fetchProducts = createAsyncThunk<ProductCredentials[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const { data: products } = await axiosApi.get<ProductCredentials[]>(`/products`, { params: { category: categoryId } });
    return products;
  },
);