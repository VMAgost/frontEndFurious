import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Race from './components/Race.jsx'
import Garage from './components/Garage.jsx'

import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "/api/race",
        element: <Race />
    },
    {
        path: "/api/garage",
        element: <Garage />
    }
])





ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

    // <App />
)
