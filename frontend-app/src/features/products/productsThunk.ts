import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import {GlobalError, ProductCredentials, ProductFields} from '../../types';
import {RootState} from '../../app/store';
import {isAxiosError} from 'axios';

export const fetchProducts = createAsyncThunk<ProductCredentials[], string | undefined>(
  'products/fetchAll',
  async (categoryId) => {
    const {data: products} = await axiosApi.get<ProductCredentials[]>(`/products`, {params: {category: categoryId}});
    return products;
  },
);

export const addProduct = createAsyncThunk<void, ProductFields, { rejectValue: GlobalError, state: RootState }>(
  'products/addProduct',
  async (productData, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to add a post.'});
      }

      const formData = new FormData();
      const keys = Object.keys(productData) as (keyof ProductFields)[];
      keys.forEach((key) => {
        const value = productData[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      await axiosApi.post('/products', formData, {headers: {Authorization: `Bearer ${token}`}});
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);

export const fetchOneProduct = createAsyncThunk<ProductCredentials, string | undefined>(
  'products/fetchOneProduct',
  async (id) => {
    const {data: product} = await axiosApi.get(`/products/${id}`);
    return product;
  }
);

export const deleteProduct = createAsyncThunk<void, string, { rejectValue: GlobalError, state: RootState }>(
  'products/deleteProduct',
  async (id, {getState, rejectWithValue}) => {
    try {
      const token = getState().users.user?.token;

      if (!token) {
        return rejectWithValue({error: 'You must be logged in to add a post.'});
      }

      await axiosApi.delete(`/products/${id}`, {headers: {Authorization: `Bearer ${token}`}});

    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  }
);