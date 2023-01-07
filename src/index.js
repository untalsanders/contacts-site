'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App from './App'
import ErrorPage from './error-page'
import Contact from './contact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
    },
    {
        path: 'contacts/:contactId',
        element: <Contact />,
    },
])

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
