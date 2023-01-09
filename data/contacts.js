'use strict'

import localforage from 'localforage'
import { matchSorter } from 'match-sorter'
import sortBy from 'sort-by'

let fakeCache = {}

const fakeNetwork = async key => {
    if (!key) {
        fakeCache = {}
    }

    if (fakeCache[key]) {
        return
    }

    fakeCache[key] = true
    return new Promise(res => {
        setTimeout(res, Math.random() * 800)
    })
}

const set = contacts => localforage.setItem('contacts', contacts)

export const getContacts = async query => {
    await fakeNetwork(`getContacts:${query}`)
    let contacts = await localforage.getItem('contacts')
    if (!contacts) contacts = []
    if (query) {
        contacts = matchSorter(contacts, query, { keys: ['first', 'last'] })
    }
    return contacts.sort(sortBy('last', 'createdAt'))
}

export const createContact = async () => {
    await fakeNetwork()
    let id = Math.random().toString(36).substring(2, 9)
    let contact = { id, createAt: Date.now() }
    let contacts = await getContacts()
    contacts.unshift(contact)
    await set(contacts)
    return contact
}
