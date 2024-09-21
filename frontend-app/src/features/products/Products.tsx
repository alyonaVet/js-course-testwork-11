import {Box, Container, Stack} from '@mui/material';
import CategoriesMenu from '../categories/components/CategoryMenu';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../categories/categoriesSlice';
import {useEffect} from 'react';
import {fetchCategories} from '../categories/categoriesThunk';
import Product from './components/Product';
import {selectProducts} from './productsSlice';
import {useNavigate} from 'react-router-dom';
import {fetchProducts} from './productsThunk';

const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCardClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container maxWidth="xl">
      <Stack direction="row">
        <Box sx={{flexGrow: 0, flexShrink: 0, width: '25%'}}>
          <CategoriesMenu categories={categories}/>
        </Box>
        <Box sx={{flexGrow: 0, flexShrink: 0, width: '75%'}}>
          <Stack direction="row" flexWrap={'wrap'}>
            {products.map((product) => (
              <Product
                key={product._id}
                product={product}
                onClick={() => handleCardClick(product._id)}/>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Products;