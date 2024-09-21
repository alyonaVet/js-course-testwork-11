import express from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';
import {CategoryFields} from '../types';

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res, next) => {
  try {
    const categoryData: CategoryFields = {
      title: req.body.title,
    };

    const category = new Category(categoryData);
    await category.save();
    return res.send(category);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }
    return next(error);
  }
});

categoriesRouter.get('/', async (req, res, next) => {
  try {
    const categories = await Category.find();
    return res.send(categories);
  } catch (error) {
    return next(error);
  }
});

export default categoriesRouter;