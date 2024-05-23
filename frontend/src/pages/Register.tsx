import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import Container from '@mui/material/Container';
import AuthForm from '../components/AuthForm';
import { registerUserApiCall } from '../utils/apiUtils';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onSubmit = async (data: { email: string; password: string }) => {
    await registerUserApiCall(data);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <Container maxWidth="xs">
      <AuthForm
        schema={schema}
        onSubmit={onSubmit}
        buttonText="Register"
        navigateLink={() => navigate('/')}
        navigateText="Already have an account? Sign in"
      />
    </Container>
  );
};

export default Register;
