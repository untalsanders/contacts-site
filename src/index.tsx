'use strict'

import React, { StrictMode } from 'react'
import { Container, createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App, { action as rootAction, loader as rootLoader } from './App'
import Contact, { action as contactAction, loader as contactLoader } from './contact'
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
                errorElement: <ErrorPage />,
                children: [
                    {
                        index: true,
                        element: <Index />,
                    },
                    {
                        path: 'contacts/:id',
                        element: <Contact />,
                        loader: contactLoader,
                        action: contactAction,
                    },
                    {
                        path: 'contacts/:id/edit',
                        element: <EditContact />,
                        loader: contactLoader,
                        action: editAction,
                    },
                    {
                        path: 'contacts/:id/destroy',
                        action: deleteAction,
                    },
                ],
            },
        ],
    },
])

const el = document.getElementById('root') as Container
const root = createRoot(el)
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
