'use strict'

import '@/styles/global.scss'
import { Form, NavLink, Outlet, redirect, useLoaderData, useNavigation, useSubmit } from 'react-router-dom'
import { createContact, getContacts } from '../data/contacts'
import React, { Key, useEffect } from 'react'

export const loader = async ({ request }: { request: Request }) => {
    const url = new URL(request.url)
    const q = url.searchParams.get('q')
    return { contacts: await getContacts(q), q }
}
export const action = async () => {
    const contact = await createContact()
    return redirect(`/contacts/${contact.id}/edit`)
}

export default function App() {
    // @ts-ignore
    const { contacts, q } = useLoaderData()
    const navigation = useNavigation()
    const submit = useSubmit()

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q')

    useEffect(() => {
        // @ts-ignore
        document.querySelector('#q').value = q
    }, [q])

    return (
        <>
            <div className="sidebar">
                <h1>Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? 'loading' : ''}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={e => {
                                const isFirstSearch = q == null
                                submit(e.currentTarget.form, { replace: !isFirstSearch })
                            }}
                        />
                        <div id="search-spinner" aria-hidden hidden={!searching} />
                        <div className="sr-only" aria-live="polite" />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {contacts.length ? (
                        <ul>
                            {contacts.map((contact: { id: Key; first: any; last: any; favorite: any }) => (
                                <li key={contact.id}>
                                    <NavLink
                                        to={`contacts/${contact.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive ? 'active' : isPending ? 'pending' : ''
                                        }>
                                        {contact.first || contact.last ? (
                                            <>
                                                {contact.first} {contact.last}
                                            </>
                                        ) : (
                                            <i>No name</i>
                                        )}{' '}
                                        {contact.favorite && <span>★</span>}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No contacts</i>
                        </p>
                    )}
                </nav>
            </div>
            <div className={`detail ${navigation.state === 'loading' ? 'loading' : ''}`}>
                <Outlet />
            </div>
        </>
    )
}
