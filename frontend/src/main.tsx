import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import NextUIProvider from '@nextui-org/react';
import App from './App'
import store from './redux/store'
import './index.css'

createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      
          <App />
        
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
