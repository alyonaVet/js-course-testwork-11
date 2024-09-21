import {Box, CircularProgress, Container, Stack, Typography} from '@mui/material';
import CategoriesMenu from '../categories/components/CategoryMenu';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {selectCategories} from '../categories/categoriesSlice';
import {useEffect} from 'react';
import Product from './components/Product';
import {selectProducts, selectProductsFetching} from './productsSlice';
import {useNavigate, useParams} from 'react-router-dom';
import {fetchProducts} from './productsThunk';
import {CategoryCredentials, ProductCredentials} from '../../types';

const Products = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector(selectCategories);
  const products = useAppSelector(selectProducts);
  const {catId} = useParams();
  const productsFetching = useAppSelector(selectProductsFetching);

  const catFilter = catId
    ? (product: ProductCredentials) => product.category._id === catId
    : () => true;

  const catTitle = catId
    ? categories.find((cat: CategoryCredentials) => cat._id === catId)?.title
    : 'All Categories';

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleCardClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <Container maxWidth="xl" sx={{mt: 3}}>
      {productsFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        <Stack direction="row">
          <Box sx={{flexGrow: 0, flexShrink: 0, width: '25%'}}>
            <CategoriesMenu categories={categories}/>
          </Box>
          <Box sx={{flexGrow: 0, flexShrink: 0, width: '75%'}}>
            <Typography component="h1" variant="h5" sx={{pl: 1}}>{catTitle}</Typography>

            <Stack direction="row" flexWrap={'wrap'}>
              {products.filter(catFilter).map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  onClick={() => handleCardClick(product._id)}/>
              ))}
            </Stack>
          </Box>
        </Stack>
      )}
    </Container>
  );
};

export default Products;