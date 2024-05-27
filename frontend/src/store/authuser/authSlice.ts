import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
    userId: string
    token: string
}

export interface AuthState {
    isAuthenticated: boolean
    user: IUser | null
}

const storedUser = localStorage.getItem('user')
const parsedUser: IUser | null = storedUser ? JSON.parse(storedUser) : null

const initialState: AuthState = {
    isAuthenticated: parsedUser !== null,
    user: parsedUser,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('user')
        },
    },
})

export const { login, logout } = authSlice.actions

export const selectAuth = (state) => state.auth

export default authSlice.reducer
