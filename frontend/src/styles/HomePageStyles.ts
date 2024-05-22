import { styled } from '@mui/system'
import bgImage from './../assets/HomeBgImage.png'
import { Box, Paper } from '@mui/material'

export const BackgroundBox = styled(Box)({
    backgroundImage: `url(${bgImage})`,
    height: '55%',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
})

export const FormContainer = styled(Paper)(() => ({
    width: '50%',
    height: '30%',
    margin: '18% auto 20px',
    padding: '16px',
    display: 'flex',
    placeItems: 'center',
}))

export const SectionBox = styled(Box)(() => ({
    borderRight: '2px solid #D3D3D3',
    width: '30%',
    height: '100%',
}))

export const CalendarBox = styled(Box)(() => ({
    borderRight: '2px solid #D3D3D3',
    width: '30%',
    height: '100%',
    position: 'relative',
}))

export const DatePickerContainer = styled(Box)({
    position: 'absolute',
    top: 'calc(100% + 10px)',
    left: 0,
    zIndex: 999,
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    borderRadius: '4px',
    padding: '10px',
})

export const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    border: '1px solid',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    borderRadius: '10px',
    textAlign: 'center',
}))
