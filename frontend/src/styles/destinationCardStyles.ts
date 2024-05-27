import styled from '@emotion/styled'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

export const StyledCard = styled(Card)`
    width: 100%;
    font-family: 'Poppins, sans-serif';
    &:hover {
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
`

export const StyledCardMedia = styled(CardMedia)`
    height: 180px;
    object-fit: cover;
`

export const TitleTypography = styled(Typography)`
    font-family: 'Poppins, sans-serif';
    font-weight: 500;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    text-overflow: ellipsis;
`

export const DescriptionTypography = styled(Typography)`
    font-family: 'Poppins, sans-serif';
    font-weight: 300;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    text-overflow: ellipsis;
`

export const StyledButton = styled(Button)`
    background-color: #f16b51;
    color: white;
    padding: 5px 10px;
    border-radius: 20px;
    font-family: 'Poppins, sans-serif';
    font-weight: 500;
    &:hover {
        background-color: #e05540;
    }
`
