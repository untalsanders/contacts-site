'use strict'

import localforage from 'localforage'
import { matchSorter } from 'match-sorter'

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
    return contacts.sort((a, b) => (a.first > b.first) ? 1 : (a.first < b.first) ? -1 : 0)
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

export const getContact = async id => {
    await fakeNetwork(`contact:${id}`)
    let contacts = await localforage.getItem('contacts')
    let contact = contacts.find(contact => contact.id === id)
    return contact ?? null
}

export const updateContact = async (id, updates) => {
    await fakeNetwork()
    let contacts = await localforage.getItem('contacts')
    let contact = contacts.find(contact => contact.id === id)
    if (!contact) throw new Error('No contact found for', id)
    Object.assign(contact, updates)
    await set(contacts)
    return contact
}

export const deleteContact = async id => {
    let contacts = await localforage.getItem('contacts')
    let index = contacts.findIndex(contact => contact.id === id)
    if (index > -1) {
        contacts.splice(index, 1)
        await set(contacts)
        return true
    }
    return false
}
