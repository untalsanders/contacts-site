'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
])

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
