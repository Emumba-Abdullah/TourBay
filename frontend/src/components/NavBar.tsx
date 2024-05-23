// React and React Router
import * as React from 'react'
import { Navigate,useNavigate } from 'react-router-dom'

// Material UI Components
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'

// Material UI Icons
import MenuIcon from '@mui/icons-material/Menu'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'

// Store (Redux) Hooks
import { logout } from '../store/authuser/authSlice'
import { useAppSelector, useAppDispatch } from '../store/hooks'

// Styles
import { StyledNavItems, StyledNavLink } from '../styles/navbarStyles'

// Logo
import logo from './../assets/logo.png'


const pages = ['Tours', 'Add Tour', 'My Bookings']

export default function NavBar() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    )
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    )
    const { isAuthenticated } = useAppSelector((state) => state.auth)
    const logoutUser = 'Logout'

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const handleLogout = () => {
        localStorage.setItem('userToken', JSON.stringify(null))
        dispatch(logout())
    }

    const handleLogoClick = () => {
        navigate('/homePage')
    }

    return (
        <AppBar position="static" sx={{ bgcolor: 'transparent', paddingLeft:5, paddingRight:5}} elevation={0}>
            <Container maxWidth="xl">
                {!isAuthenticated && localStorage.getItem('userToken') == null && <Navigate to="/SignIn" replace={true} />}
                <Toolbar>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                        }}
                        onClick={handleLogoClick}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            style={{ maxWidth: '300px', maxHeight: '40px' }}
                        />
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center" sx={{ fontFamily: 'Poppins, sans-serif' }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            mr: 1,
                        }}
                    >
                        <img
                            src={logo}
                            alt="TourBay"
                            style={{ maxWidth: '300px', maxHeight: '40px' }}
                        />
                    </Box>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            marginRight: 10,
                        }}
                    >
                        {pages.map((page) => (
                            <StyledNavItems
                                key={page}
                                onClick={handleCloseNavMenu}
                            >
                                <StyledNavLink
                                    to={`/${page.replace(/\s+/g, '').toLowerCase()}`}
                                >
                                    {page}
                                </StyledNavLink>
                            </StyledNavItems>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <AccountCircleRoundedIcon
                                    sx={{ fontSize: 30 }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={handleCloseUserMenu}>
                                <Button onClick={handleLogout}>
                                    {logoutUser}
                                </Button>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
