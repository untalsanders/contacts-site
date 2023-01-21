'use strict'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App, { action as rootAction, loader as rootLoader } from './App'
import Contact, { loader as contactLoader } from './contact'
import { action as deleteAction } from './destroy'
import EditContact, { action as editAction } from './edit'
import ErrorPage from './error-page'
import Index from './home'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: rootLoader,
        action: rootAction,
        children: [
            {
                index: true,
                element: <Index />,
            },
            {
                path: 'contacts/:id',
                element: <Contact />,
                errorElement: <ErrorPage />,
                loader: contactLoader,
            },
            {
                path: 'contacts/:id/edit',
                element: <EditContact />,
                errorElement: <ErrorPage />,
                loader: contactLoader,
                action: editAction,
            },
            {
                path: 'contacts/:id/destroy',
                errorElement: <ErrorPage />,
                action: deleteAction,
            },
        ],
    },
])

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
