'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App, { loader as rootLoader, action as rootAction } from './App'
import ErrorPage from './error-page'
import Contact, { loader as contactLoader } from './contact'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                path: 'contacts/:id',
                element: <Contact />,
                loader: contactLoader
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
