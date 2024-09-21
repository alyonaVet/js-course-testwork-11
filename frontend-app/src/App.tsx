import './App.css';
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Register from './features/users/components/Register';
import Login from './features/users/components/Login';
import NotFoundPage from './UI/NotFoundPage/NotFoundPage';
import Products from './features/products/Products';
import AddProduct from './features/products/AddProduct';
import {useEffect} from 'react';
import {useAppDispatch} from './app/hooks';
import {fetchCategories} from './features/categories/categoriesThunk';
import OneProduct from './features/products/OneProduct';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Products />}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/new-product" element={<AddProduct/>}/>
          <Route path="/products/:id" element={<OneProduct/>}/>
          <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
      </main>
    </>
  );
};

export default App;
