import {Box, Typography} from '@mui/material';
import AddProductForm from './components/AddProductForm';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {addProduct, fetchProducts} from './productsThunk';
import {ProductFields} from '../../types';
import {selectProductsCreating} from './productsSlice';
import {useNavigate} from 'react-router-dom';

const AddProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const productsCreating = useAppSelector(selectProductsCreating);

  const submitHandler = async (productData: ProductFields) => {
   await dispatch(addProduct(productData));
   await dispatch(fetchProducts());
   navigate('/');
  };

  return (
    <Box sx={{m:3}}>
      <Typography variant='h4'>Create new Product</Typography>
      <AddProductForm onSubmit={submitHandler} isLoading={productsCreating} />
    </Box>
  );
};

export default AddProduct;