import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'
import { BrowserRouter } from 'react-router-dom'

// Importing BrowserRouter to enable routing in the application)
ReactDOM.createRoot(document.getElementById('root')!).render(  
  <React.StrictMode>
    <BrowserRouter>  {/*Wrapping the App component with BrowserRouter to enable routing*/}  
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
