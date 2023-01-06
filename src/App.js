'use strict'

import '@/styles/global.scss'
import { Link } from 'react-router-dom'

export default function App() {
    return (
        <>
            <div className="sidebar">
                <h1>Contacts</h1>
                <div>
                    <form id="search-form" role="search">
                        <input id="q" aria-label="Search contacts" placeholder="Search" type="search" name="q" />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite" />
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/contacts/1`}>Your name</Link>
                        </li>
                        <li>
                            <Link to={`/contacts/2`}>Your Friend</Link>
                        </li>
                    </ul>
                </nav>
                <div id="detail"></div>
            </div>
        </>
    )
}
