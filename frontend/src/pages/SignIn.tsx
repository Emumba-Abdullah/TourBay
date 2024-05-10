// mui imports 
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { loginUser } from '../services/auth';
import { Navigate } from "react-router-dom";
import { login} from '../store/authuser/authSlice';
import { useAppSelector, useAppDispatch } from '../store/hooks'

const SignIn = () => {
  const { isAuthenticated} = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
     const response = await loginUser({
        email: data.get('email'),
        password: data.get('password')
     });
    const userData = {
      email: data.get('email'),
      token: String(response.data.token)
    };
    dispatch(login(userData))
    console.log(isAuthenticated);
  };

  return (
    <Container maxWidth="xs">
      {isAuthenticated && (
          <Navigate to="/HomePage" replace={true} />
        )}
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
            label="email"
            name="email"
            autoComplete="email"
            autoFocus
            InputProps={{
              startAdornment: (
                <PersonOutlineIcon
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
              )
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
                  sx={{ color: 'action.active', mr: 1, my: 0.5 }}
                />
              )
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignIn;