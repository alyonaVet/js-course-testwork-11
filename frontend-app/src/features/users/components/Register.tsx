import React, {ChangeEvent, useState} from 'react';
import {RegisterCredentials} from '../../../types';
import {Avatar, Box, Button, Container, TextField, Typography, Link} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../../app/hooks';
import {register} from '../usersThunk';
import {selectRegisterError} from '../usersSlice';

const Register = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectRegisterError);
  const navigate = useNavigate();

  const [registerData, setRegisterData] = useState<RegisterCredentials>({
    username: '',
    password: '',
    name: '',
    phoneNumber: '',
  });

  const getFieldError = (fieldName: string) => {
    return error?.errors[fieldName]?.message;
  };

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await dispatch(register(registerData)).unwrap();
      navigate('/');
    } catch (error) {
      return {error: error};
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        noValidate
        onSubmit={submitFormHandler}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          p: 4,
          border: '1px solid #ddd',
          borderRadius: 2,
          mt: 5,
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, backgroundColor: '#448aff'}}>
          <LockOutlinedIcon/>
        </Avatar>
        <Typography variant="h5" component="h1" textAlign="center" gutterBottom>
          Sign up
        </Typography>

        <TextField
          required
          label="Username"
          name="username"
          autoComplete="new-username"
          value={registerData.username}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('username'))}
          helperText={getFieldError('username')}
          fullWidth
        />

        <TextField
          required
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={registerData.password}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('password'))}
          helperText={getFieldError('password')}
          fullWidth
        />

        <TextField
          required
          label="Name"
          name="name"
          type="name"
          autoComplete="new-name"
          value={registerData.name}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('name'))}
          helperText={getFieldError('name')}
          fullWidth
        />

        <TextField
          required
          label="Phone Number"
          name="phoneNumber"
          type="phoneNumber"
          autoComplete="new-phoneNumber"
          value={registerData.phoneNumber}
          onChange={inputChangeHandler}
          error={Boolean(getFieldError('phoneNumber'))}
          helperText={getFieldError('phoneNumber')}
          fullWidth
        />

        <Button type="submit" variant="contained" sx={{mt: 2, backgroundColor: '#448aff'}} fullWidth>
          Sign up
        </Button>
        <Typography variant="body2" color="text.secondary" sx={{mt: 2}}>
          Already have an account?{' '}
          <Link component={RouterLink} to={'/login'} variant="body2">
            Sign in
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Register;