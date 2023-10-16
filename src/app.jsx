import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import Main from './ux/Main.jsx'

const rootElement = document.getElementById('app-root')
const root = ReactDOM.createRoot(rootElement)


root.render(<Main />)