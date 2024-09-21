import {useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Button, CardMedia, CircularProgress, Stack, styled, Typography} from '@mui/material';
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
  const isFetching = useAppSelector(selectOneProductFetching);

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
      {isFetching ? (
        <CircularProgress/>
      ) : (
        product && (
          <Stack spacing={2} p={1} textAlign="center" sx={{border: '1px solid #eee', maxWidth: '300px',}}>
            {cardImage && (
              <ImageCardMedia image={cardImage}/>
            )}
            <Typography variant="h4">{product.title}</Typography>
            <Typography variant="h6">{product.price} KGS</Typography>
            <Typography variant="body1">{product.description}</Typography>
            {user && (
              <Button disabled={product.user !== user._id} onClick={() => handleDelete(product._id)}>Delete
                product</Button>
            )
            }
          </Stack>
        )
      )}
    </Stack>
  );
};

export default OneProduct;
