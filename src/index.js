'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App, { loader as rootLoader } from './App'
import ErrorPage from './error-page'
import Contact from './contact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        children: [
            {
                path: 'contacts/:id',
                element: <Contact />,
            },
        ]
    },
])

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
