import React from 'react';
import {ProductCredentials} from '../../../types';
import {Box, Card, CardActionArea, CardContent, CardMedia, styled, Typography} from '@mui/material';
import {apiURL} from '../../../constants';

interface Props {
  product: ProductCredentials;
  onClick: () => void;
}

const Product: React.FC<Props> = ({product, onClick}) => {
  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '100%',
    objectFit: 'cover',
  });
  const cardImage = product.image ? apiURL + '/' + product.image : '';

  return (
    <Box sx={{width: '25%', p: 1, boxSizing: 'border-box'}}>
      <Card sx={{
        '&:hover': {
          boxShadow: 6,
        },
      }}>
        <CardActionArea onClick={onClick}>
          {product.image ? (
            <ImageCardMedia image={cardImage}/>
          ) : (
            <Box sx={{height: 0, paddingTop: '100%', backgroundColor: '#fafafa'}}/>
          )}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {product.title}
            </Typography>
            <Typography gutterBottom variant="h5" component="div" textAlign="center">
              {product.price} KGS
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Box>
  );
};

export default Product;