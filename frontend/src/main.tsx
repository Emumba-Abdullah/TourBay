import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux';
import authStore from './store/Store.ts';
import { RouterProvider } from 'react-router-dom';
import router from './Router.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={authStore}>
  <React.StrictMode>
     <RouterProvider router={router} />
    </React.StrictMode>
    </Provider>
  ,
)
