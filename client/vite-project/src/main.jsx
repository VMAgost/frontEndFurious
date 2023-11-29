import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Race from './components/Race.jsx'
import Garage from './components/Garage.jsx'
import Warmup from './components/Warmup.jsx'

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
    },
    {
        path: "/api/warmup",
        element: <Warmup />
    }
])





ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

    // <App />
)
