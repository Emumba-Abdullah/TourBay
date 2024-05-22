import styled from '@emotion/styled'
import { Box, Typography, Paper } from '@mui/material'

export const Container = styled(Paper)`
    width: 100%;
    padding: 20px;
    border-radius: 16px;
    margin-bottom: 20px;
`

export const CardHeader = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
`

export const Title = styled(Typography)`
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    margin-bottom: 5%;
`

export const StyledList = styled('li')`
    margin-bottom: 8px;
    display: flex;
    align-items: center;
`
