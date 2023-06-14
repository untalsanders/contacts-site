'use strict'

import { redirect } from 'react-router-dom'
import { deleteContact } from './api/contacts'

export const action = async ({ params }) => {
    await deleteContact(params.id)
    return redirect(BASE_URL)
}
