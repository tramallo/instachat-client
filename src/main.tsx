import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import socketClient from 'socket.io-client'

const socket = socketClient('http://localhost:3000', { transports: ['websocket'] })

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
  </React.StrictMode>,
)
