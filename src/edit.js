'use strict'

import { Form, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { updateContact } from '../data/contacts'

export const action = async ({ request, params }) => {
    const formData = await request.formData()
    const updates = Object.fromEntries(formData)
    await updateContact(params.id, updates)
    return redirect(`/contacts/${params.id}`)
}

export default function EditContact() {
    const { contact } = useLoaderData()
    const navigate = useNavigate()

    const cancelHandleClick = () => {
        navigate(-1)
    }

    return (
        <Form method="post" className="contact-form">
            <p>
                <span>Name</span>
                <input
                    type="text"
                    placeholder="First"
                    aria-label="First name"
                    name="first"
                    defaultValue={contact.first}
                />
                <input type="text" placeholder="Last" aria-label="Last name" name="last" defaultValue={contact.last} />
            </p>
            <label htmlFor="twitter">
                <span>Twitter</span>
                <input type="text" name="twitter" placeholder="@jack" defaultValue={contact.twitter} />
            </label>
            <label htmlFor="avatar">
                <span>Avatar URL</span>
                <input
                    type="text"
                    name="avatar"
                    defaultValue={contact.avatar}
                    aria-label="Avatar URL"
                    placeholder="https://example.com/avatar.jpg"
                />
            </label>
            <label htmlFor="notes">
                <span>Notes</span>
                <textarea name="notes" defaultValue={contact.notes} rows={6}></textarea>
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={cancelHandleClick}>
                    Cancel
                </button>
            </p>
        </Form>
    )
}
