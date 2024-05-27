import styled from '@emotion/styled'
import Button from '@mui/material/Button'
import { NavLink } from 'react-router-dom'

export const StyledNavItems = styled(Button)`
    margin-top: 16px;
    margin-bottom: 16px;
    display: block;
    margin-left: 16px;
    padding: 10px 20px;
    font-weight: bold;
    text-transform: none;
    font-family: 'Poppins, Roboto';
`
export const StyledNavLink = styled(NavLink)`
    font-family: 'Poppins, Roboto';
    color: black;
    text-decoration: none;
    font-weight: bold;
    font-size: 20px;
`
