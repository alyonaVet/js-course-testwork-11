import {Box, Typography} from '@mui/material';
import AddProductForm from './components/AddProductForm';
import {useAppDispatch} from '../../app/hooks';
import {addProduct, fetchProducts} from './productsThunk';
import {ProductFields} from '../../types';

const AddProduct = () => {
  const dispatch = useAppDispatch();

  const submitHandler = async (productData: ProductFields) => {
   await dispatch(addProduct(productData));
   await dispatch(fetchProducts());
  };

  return (
    <Box sx={{m:3}}>
      <Typography variant='h4'>Create new Product</Typography>
      <AddProductForm onSubmit={submitHandler} isLoading={false} />
    </Box>
  );
};

export default AddProduct;