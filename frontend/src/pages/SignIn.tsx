import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import AuthForm from '../components/AuthForm';
import { loginUser } from '../services/auth';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/authuser/authSlice';
const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: { email: string; password: string }) => {
    const response = await loginUser(data);
    const userData = {
      userId: String(response.data.user._id),
      token: String(response.data.token),
    };
    localStorage.setItem('userToken', JSON.stringify(response.data.token));
      dispatch(login(userData));
    navigate("./homePage")
  };

  return (
    <Container maxWidth="xs">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        buttonText="Sign In"
        navigateLink={() => navigate('/register')}
        navigateText="Don't have an account? Register"
      />
    </Container>
  );
};

export default SignIn;
