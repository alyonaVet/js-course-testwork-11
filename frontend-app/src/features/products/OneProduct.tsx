import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Box, Button, CardMedia, CircularProgress, Stack, styled, Typography} from '@mui/material';
import {selectOneProduct, selectOneProductFetching} from './productsSlice';
import {useAppDispatch, useAppSelector} from '../../app/hooks';
import {deleteProduct, fetchOneProduct, fetchProducts} from './productsThunk';
import {apiURL} from '../../constants';
import {selectUser} from '../users/usersSlice';

const OneProduct = () => {
  const {id} = useParams() as { id: string };
  const user = useAppSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectOneProduct);
  const oneProductFetching = useAppSelector(selectOneProductFetching);

  useEffect(() => {
    dispatch(fetchOneProduct(id));
  }, [dispatch, id]);

  const handleDelete = async (id: string) => {
    await dispatch(deleteProduct(id));
    await dispatch(fetchProducts());
    navigate(`/`);
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });

  const cardImage = product?.image ? apiURL + '/' + product.image : '';

  return (
    <Stack mt={5} justifyContent="center" direction={'row'}>
      {oneProductFetching ? (
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'}}>
          <CircularProgress/>
        </Box>
      ) : (
        product && (
          <Stack spacing={2} p={1} textAlign="center" sx={{border: '1px solid #eee', maxWidth: '300px',}}>
            {cardImage && (
              <ImageCardMedia image={cardImage}/>
            )}
            <Typography variant="body1">{product.category.title}</Typography>
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6">{product.price} KGS</Typography>
            <Typography variant="body1">{product.description}</Typography>
            <Typography variant="body1">{product.user.name}</Typography>
            <Typography variant="body1">{product.user.phoneNumber}</Typography>
            {user && product.user._id === user._id &&(
              <Button onClick={() => handleDelete(product._id)}>Delete
                product</Button>
            )}
          </Stack>
        )
      )}
    </Stack>
  );
};

export default OneProduct;
