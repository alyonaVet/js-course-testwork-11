import React, {useEffect, useState} from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import {LoadingButton} from '@mui/lab';
import {ProductFields} from '../../../types';
import FileInput from '../../../UI/FileInput/FileInput';
import {selectCategories} from '../../categories/categoriesSlice';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {selectUser} from '../../users/usersSlice';
import {fetchCategories} from '../../categories/categoriesThunk';

interface Props {
  onSubmit: (product: ProductFields) => void;
  isLoading: boolean;
}

const AddProductForm: React.FC<Props> = ({onSubmit, isLoading}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  if (!user) {
    return (<Typography>You have to be logged in!</Typography>);
  }
  const categories = useAppSelector(selectCategories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [productData, setProductData] = useState<ProductFields>({
    user: user._id,
    category: categories[0]._id,
    title: '',
    price: '',
    description: '',
    image: '',
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const fileInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = event.target;
    const value = files && files[0] ? files[0] : null;

    setProductData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const categoryInputChangeHandler = (event: SelectChangeEvent) => {
    setProductData({...productData, category: event.target.value});
  };

  const submitFormHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if (!productData.title || !productData.description || !productData.price || !productData.category || !productData.image || parseInt(productData.price) < 0) {
      setErrorMessage('All fields should be filled correct.');
      return;
    }

    onSubmit({...productData});
    setProductData({
      user: '',
      category: '',
      title: '',
      price: '',
      description: '',
      image: '',
    });
  };

  return (
    <Stack
      component="form"
      onSubmit={submitFormHandler}
      display="flex"
      flexDirection="column"
      alignItems="start"
      gap={2}
      mt={3}
    >
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Title:</Typography>
        </Box>
        <TextField
          label="Enter product title"
          id="title"
          name="title"
          value={productData.title}
          onChange={inputChangeHandler}
          error={!!errorMessage && !productData.title}
          helperText={!!errorMessage && !productData.title ? 'Title is required' : ''}
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Description:</Typography>
        </Box>
        <TextField
          id="description"
          name="description"
          label="Enter description"
          value={productData.description}
          onChange={inputChangeHandler}
          error={!!errorMessage && !productData.description}
          helperText={!!errorMessage && !productData.description ? 'Description is required' : ''}
          fullWidth
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="150px">
          <Typography variant="body1">Price:</Typography>
        </Box>
        <TextField
          id="price"
          name="price"
          label="Enter Price"
          type="number"

          value={productData.price}
          onChange={inputChangeHandler}
          error={!!errorMessage && !productData.price && parseInt(productData.price) < 0}
          helperText={!!errorMessage && (!productData.price || parseInt(productData.price) < 0)? 'Price is required and must be greater then 0' : ''}
          fullWidth
        />
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box width="100px">
          <Typography variant="body1">Image:</Typography>
        </Box>
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
          error={!!errorMessage && !productData.image}
          helperText={!!errorMessage && !productData.image ? 'Image is required' : ''}
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={5}>
        <InputLabel>Category</InputLabel>
        <FormControl fullWidth>
          <Select
            id="category"
            value={productData.category}
            label="Category"
            onChange={categoryInputChangeHandler}
          >
            {
              categories.map(
                (category) => (
                  <MenuItem key={category._id} value={category._id}>{category.title}</MenuItem>
                )
              )
            }

          </Select>
          {!!errorMessage && !productData.category && <Typography color="error">Category is required</Typography>}
        </FormControl>
      </Stack>
      <Stack direction="row" alignItems="center" mt={5}>
        <LoadingButton
          type="submit"
          disabled={isLoading}
          loadingPosition="center"
          variant="contained"
        >
          <span>create product</span>
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

export default AddProductForm;