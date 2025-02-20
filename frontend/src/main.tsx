import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import NextUIProvider from '@nextui-org/react';
import App from './App'
import store,{persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'

createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>

          <App />
      </BrowserRouter>
      </PersistGate>
        
    </Provider>
  </React.StrictMode>,
)
