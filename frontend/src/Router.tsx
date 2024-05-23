import { createBrowserRouter } from 'react-router-dom'
import SignIn from './pages/SignIn'
import HomePage from './pages/HomePage'
import Register from './pages/Register'
import MyTours from './pages/MyTours'
import AddTour from './pages/AddTour'
import ProtectedRoute from './ProtectedRoute'
import Tours from './pages/Tours'
import TourDetail from './pages/TourDetail'
import BookTour from './pages/BookTour'
import SearchResults from './pages/SearchResults'
import UpdateBooking from './pages/UpdateBooking'

const router = createBrowserRouter([
    {
        path: '/',
        element: <SignIn />,
        index: true,
    },
    {
        path: '/register',
        element: <Register />,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: '/homePage',
                element: <HomePage />,
            },
            {
                path: '/myBookings',
                element: <MyTours />,
            },
            {
                path: '/addTour',
                element: <AddTour />,
            },
            {
                path: '/tours',
                element: <Tours />,
            },
            {
                path: '/tourDetail',
                element: <TourDetail />,
            },
            {
                path: '/bookTour',
                element: <BookTour />,
            },
              {
                path: '/searchResults',
                element: <SearchResults/>
            },
              {
                path: '/updateBooking',
                element: <UpdateBooking/>
            },
              
        ],
    },
    {
        path: '*',
        element: <p>NotFound</p>,
    },
])

export default router
