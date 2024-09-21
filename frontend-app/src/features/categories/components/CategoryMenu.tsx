import { Stack, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React from 'react';
import {CategoryCredentials} from '../../../types';

interface Props {
  categories: CategoryCredentials[];
}

const CategoriesMenu: React.FC<Props> = ({ categories }) => {
  const { categoryId } = useParams();

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Categories</Typography>
      <List>
        <ListItem disablePadding>
          <ListItemButton component={Link} to="/" selected={!categoryId}>
            <ListItemText primary="All products" />
          </ListItemButton>
        </ListItem>
        {categories.map((category) => (
          <ListItem key={category._id} disablePadding>
            <ListItemButton
              component={Link}
              to={`/categories/${category._id}`}
              selected={category._id === categoryId}
            >
              <ListItemText primary={category.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default CategoriesMenu;
