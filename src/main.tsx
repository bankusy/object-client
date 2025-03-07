import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Cursor from './components/Cursor.tsx'

createRoot(document.getElementById('root')!).render(
    <>
        <App />
        <Cursor />
    </>
)
