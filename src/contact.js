'use strict'

import { Form, useLoaderData } from 'react-router-dom'
import Favorite from './favorite'
import { getContact, updateContact } from './api/contacts'

export const loader = async ({ params }) => ({ contact: await getContact(params.id) })
export const action = async ({ request, params }) => {
    let formData = await request.formData()
    return updateContact(params.id, {
        favorite: formData.get('favorite') === 'true'
    })
}

export default function Contact() {
    const { contact } = useLoaderData()

    return (
        <>
            <div className="contact">
                <img key={contact.avatar} src={contact.avatar || null} />
                <div>
                    <h1>
                        {contact.first || contact.last ? (
                            <>
                                {contact.first} {contact.last}
                            </>
                        ) : (
                            <i>No name</i>
                        )}{' '}
                        <Favorite contact={contact} />
                    </h1>

                    {contact.twitter && (
                        <p>
                            <a href={`https://twitter.com/${contact.twitter}`} target="_blank">
                                {contact.twitter}
                            </a>
                        </p>
                    )}

                    {contact.notes && <p>{contact.notes}</p>}

                    <div>
                        <Form action="edit">
                            <button type="submit">Edit</button>
                        </Form>
                        <Form
                            action="destroy"
                            method="post"
                            onSubmit={event => {
                                if (!confirm('Please confirm you want to delete this record')) {
                                    event.preventDefault()
                                }
                            }}>
                            <button type="submit">Delete</button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}
