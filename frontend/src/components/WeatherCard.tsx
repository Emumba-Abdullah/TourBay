import { Box, Paper, Typography } from '@mui/material'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import FastfoodIcon from '@mui/icons-material/Fastfood'
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports'
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined'
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined'
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined'
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined'

export default function WeatherCard() {
    const getWeatherIcon = (temperature: number) => {
        if (temperature > 25) {
            return <WbSunnyOutlinedIcon />
        } else if (temperature > 15) {
            return <CloudOutlinedIcon />
        } else if (temperature > 5) {
            return <BeachAccessOutlinedIcon />
        } else {
            return <FlashOnOutlinedIcon />
        }
    }

    return (
        <Paper
            elevation={3}
            sx={{
                width: '100%',
                padding: '20px',
                backgroundColor: '#f5f5f5',
                borderRadius: '16px',
                marginBottom: '20px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '20px',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getWeatherIcon(18)}
                    <Typography variant="h6" sx={{ marginLeft: '8px' }}>
                        18°C
                    </Typography>
                </Box>
                <Typography variant="h6">Day 1</Typography>
            </Box>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li
                    style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <DirectionsWalkIcon sx={{ marginRight: '8px' }} />
                    <Typography variant="body1">Guided tour</Typography>
                </li>
                <li
                    style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <CameraAltIcon sx={{ marginRight: '8px' }} />
                    <Typography variant="body1">Photography session</Typography>
                </li>
                <li
                    style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <FastfoodIcon sx={{ marginRight: '8px' }} />
                    <Typography variant="body1">
                        Lunch with local cuisine
                    </Typography>
                </li>
                <li
                    style={{
                        marginBottom: '8px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <SportsMotorsportsIcon sx={{ marginRight: '8px' }} />
                    <Typography variant="body1">Adventure sports</Typography>
                </li>
            </ul>
        </Paper>
    )
}
