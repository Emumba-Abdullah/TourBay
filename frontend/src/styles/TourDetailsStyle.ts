import styled from '@emotion/styled'
import { Box, Button, Typography } from '@mui/material'

export const Container = styled(Box)`
    width: 100vw;
    padding-left: 12%;
    padding-right: 12%;
    margin-bottom: 10%;
    padding-top: 6px;
    margin-top: 2%;
`

export const TourTitle = styled(Typography)`
    margin-bottom: 16px;
`

export const DetailsBox = styled(Box)`
    display: flex;
    align-items: center;
    margin-bottom: 16px;
`

export const IconText = styled(Box)`
    display: flex;
    align-items: center;
    margin-right: 16px;
    color: gray;
`

export const Image = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: 50vh;
`

export const GalleryImage = styled.img`
    width: 100%;
    height: auto;
    border-radius: 8px;
    max-height: 23vh;
`

export const DescriptionText = styled(Typography)`
    margin-top: 5%;
    margin-bottom: 5%;
    text-align: center;
`

export const BookButton = styled(Button)`
    background-color: #f16b51;
    border-radius: 3px;
    display: block;
    margin: auto;
    width: 20%;
    margin-bottom: 20px;
    margin-top: 5px;
`
