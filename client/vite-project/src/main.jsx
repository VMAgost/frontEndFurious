import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Race from './components/Race.jsx'
import Garage from './components/Garage.jsx'
import Leaderboard from './components/Leaderboard.jsx'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/race",
        element: <Race />
    },
    {
        path: "/garage",
        element: <Garage />
    },
    {
        path: '/leaderboard',
        element: <Leaderboard />
    }
   
])





ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

    // <App />
)
