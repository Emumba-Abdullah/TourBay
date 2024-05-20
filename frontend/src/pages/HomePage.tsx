import { useState } from 'react'
import { Box } from '@mui/system'
import NavBar from '../components/NavBar'
import bgImage from './../assets/HomeBgImage.png'
import { Button, IconButton, Paper, Stack, Typography } from '@mui/material'
import Grid from '@mui/system/Unstable_Grid'
import styled from '@mui/system/styled'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import SelectPlace from '../components/SelectPlace'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import SelectPrice from '../components/SelectPrice'
import SelectDate from '../components/SelectDate'
import { useForm, FormProvider } from 'react-hook-form'
import { getChoosedTours } from '../utils/helpers'
import { useNavigate } from "react-router-dom";
import { popularSearches } from '../utils/helpers'

export default function HomePage() {
    const [isCalenderOpen, setIsCalenderOpen] = useState(false)
    const methods = useForm();
    const navigate = useNavigate();
    
    const onSubmit = (data) => {
        getChoosedTours(data);
        navigate('/searchResults', { state: data });
    }

    const Item = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
        padding: theme.spacing(1),
        borderRadius: '10px',
        textAlign: 'center',
    }))

    const toggleCalendar = () => {
        setIsCalenderOpen(!isCalenderOpen)
    }

    return (
        <Box sx={{ height: '100vh' }}>
            <Box
                sx={{
                    backgroundImage: `url(${bgImage})`,
                    height: '55%',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >
                <NavBar />
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(onSubmit)}>
                        <Paper
                            sx={{
                                width: '50%',
                                height: '30%',
                                ml: 'auto',
                                mr: 'auto',
                                mt: '20%',
                                padding: 2,
                            }}
                            elevation={5}
                            component={Stack}
                            direction={'row'}
                        >
                            <Box
                                sx={{
                                    borderRight: '2px solid #D3D3D3',
                                    width: '30%',
                                    height: '100%',
                                }}
                            >
                                <IconButton sx={{ display: 'inline-block' }}>
                                    <LocationOnRoundedIcon />
                                </IconButton>
                                <Typography
                                    sx={{ display: 'inline-block' }}
                                    variant="h6"
                                >
                                    Choose location
                                </Typography>
                                <SelectPlace />
                            </Box>

                            <Box
                                sx={{
                                    borderRight: '2px solid #D3D3D3',
                                    width: '30%',
                                    height: '100%',
                                    position: 'relative',
                                }}
                            >
                                <IconButton sx={{ display: 'inline-block' }}>
                                    <CalendarMonthIcon />
                                </IconButton>
                                <Typography
                                    sx={{ display: 'inline-block' }}
                                    variant="h6"
                                >
                                    Choose dates
                                </Typography>
                                <Box
                                    sx={{
                                        ml: 1,
                                        mt: 1,
                                        color: 'gray',
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Typography>Choose from here</Typography>
                                    <IconButton onClick={toggleCalendar}>
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </Box>
                                {isCalenderOpen && (
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 'calc(100% + 10px)',
                                            left: 0,
                                            zIndex: 999,
                                            backgroundColor: '#fff',
                                            boxShadow:
                                                '0 2px 5px rgba(0,0,0,0.2)',
                                            borderRadius: '4px',
                                            padding: '10px',
                                        }}
                                    >
                                        <SelectDate />
                                    </Box>
                                )}
                            </Box>

                            <Box sx={{ width: '30%', height: '100%' }}>
                                <IconButton sx={{ display: 'inline-block' }}>
                                    <AttachMoneyIcon />
                                </IconButton>
                                <Typography
                                    sx={{ display: 'inline-block' }}
                                    variant="h6"
                                >
                                    Select the Price
                                </Typography>
                                <SelectPrice />
                            </Box>

                            <Button
                                sx={{
                                    bgcolor: '#F16B51',
                                    color: 'white',
                                    ml: 2,
                                }}
                                type="submit"
                            >
                                {' '}
                                <SearchRoundedIcon sx={{ fontSize: 30 }} />
                            </Button>
                        </Paper>
                    </form>
                </FormProvider>
                <Box sx={{ width: '50%', mt: 8, ml: 'auto', mr: 'auto' }}>
                    <Grid container spacing={2}>
                        {popularSearches.map((item, index) => (
                            <Grid key={index} xs={2}>
                                <Item>
                                    <Button>{item}</Button>
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    )
}
