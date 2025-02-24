'use strict'

import { redirect } from 'react-router-dom'
import { deleteContact } from '../data/contacts.js'

export const action = async ({ params }) => {
    await deleteContact(params.id)
    return redirect('/')
}
