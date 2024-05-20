import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'

export const Container = styled(Box)`
    width: 100vw;
    padding-left: 12%;
    padding-right: 11%;
    margin-bottom: 14px;
    padding-top: 3%;
`

export const Title = styled(Typography)`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin-bottom: 5%;
`

export const GridContainer = styled(Box)`
    flex-grow: 1;
`

export const NoResultsContainer = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const NoResultsImage = styled('img')`
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
`
