import React from 'react'
import '@/styles/index.css'
import { createRoot } from 'react-dom/client'
import NewTab from './newtab'

const container = document.getElementById('newtab-root')
const root = createRoot(container!)

root.render(
    <React.StrictMode>
        <NewTab />
    </React.StrictMode>
)
