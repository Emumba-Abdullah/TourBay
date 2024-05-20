
import { useState } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { loginUser } from '../services/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../store/authuser/authSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks';

const SignIn = () => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

    const handleCloseSnackbar = () => {
        setSnackbar({ ...snackbar, open: false });
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await loginUser({
                email: data.get('email'),
                password: data.get('password'),
            });
            const userData = {
                userId: String(response.data.user._id),
                token: String(response.data.token),
            };
            localStorage.setItem('userToken', JSON.stringify(response.data.token));
            dispatch(login(userData));
            setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Login failed. Please try again.', severity: 'error' });
        }
    };

    return (
        <Container maxWidth="xs">
            {isAuthenticated && <Navigate to="/HomePage" replace={true} />}
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <LockOutlinedIcon sx={{ fontSize: 48, color: 'primary.main' }} />
                <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <PersonOutlineIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                            ),
                        }}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        InputProps={{
                            startAdornment: (
                                <LockOutlinedIcon
                                    sx={{
                                        color: 'action.active',
                                        mr: 1,
                                        my: 0.5,
                                    }}
                                />
                            ),
                        }}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="text"
                        onClick={() => navigate('/register')}
                        sx={{ mt: 1 }}
                    >
                        Don't have an account? Register
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default SignIn;
