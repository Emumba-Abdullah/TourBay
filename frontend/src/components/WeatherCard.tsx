// Material UI Components
import { Box, Typography } from '@mui/material';

// Material UI Icons
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SportsMotorsportsIcon from '@mui/icons-material/SportsMotorsports';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import CloudOutlinedIcon from '@mui/icons-material/CloudOutlined';
import BeachAccessOutlinedIcon from '@mui/icons-material/BeachAccessOutlined';
import FlashOnOutlinedIcon from '@mui/icons-material/FlashOnOutlined';

// Types
import { IWeatherCardProps } from '../types/types';

// Styles
import { Container, CardHeader, StyledList } from '../styles/weatherCardStyles';


const activities = [
    { icon: <DirectionsWalkIcon sx={{ marginRight: '8px' }} />, text: 'Guided tour' },
    { icon: <CameraAltIcon sx={{ marginRight: '8px' }} />, text: 'Photography session' },
    { icon: <FastfoodIcon sx={{ marginRight: '8px' }} />, text: 'Lunch with local cuisine' },
    { icon: <SportsMotorsportsIcon sx={{ marginRight: '8px' }} />, text: 'Adventure sports' },
];

export default function WeatherCard({ temperature, day }: IWeatherCardProps) {
    const getWeatherIcon = (temperature: number) => {
        if (temperature > 25) {
            return <WbSunnyOutlinedIcon />;
        } else if (temperature > 15) {
            return <CloudOutlinedIcon />;
        } else if (temperature > 5) {
            return <BeachAccessOutlinedIcon />;
        } else {
            return <FlashOnOutlinedIcon />;
        }
    };

    return (
        <Container elevation={3}>
            <CardHeader>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {getWeatherIcon(temperature)}
                    <Typography variant="h6" sx={{ marginLeft: '8px' }}>
                        {temperature}°C
                    </Typography>
                </Box>
                <Typography variant="h6">Day {day}</Typography>
            </CardHeader>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {activities.map((activity, index) => (
                    <StyledList key={index}>
                        {activity.icon}
                        <Typography variant="body1">{activity.text}</Typography>
                    </StyledList>
                ))}
            </ul>
        </Container>
    );
}
