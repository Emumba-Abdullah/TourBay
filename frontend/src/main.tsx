import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'

import authStore from './store/Store.ts'
import router from './Router.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={authStore}>
        <React.StrictMode>
            <CssBaseline />
            <RouterProvider router={router} />
        </React.StrictMode>
    </Provider>
)
