import React, {StrictMode} from 'react'
import { render } from 'react-dom';
import App from './App'
import './index.scss'
import './patch-local-storage-for-github-pages';

render(
    <StrictMode>
        <App />
    </StrictMode>,
    document.getElementById('root') as HTMLElement
)
