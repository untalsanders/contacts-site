'use strict'

import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import App, { action as rootAction, loader as rootLoader } from './App.js'
import Contact, { loader as contactLoader, action as contactAction } from './contact.js'
import { action as deleteAction } from './destroy.js'
import EditContact, { action as editAction } from './edit.js'
import ErrorPage from './error-page.js'
import Index from './home.js'

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

const root = createRoot(document.getElementById('root'))
root.render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
