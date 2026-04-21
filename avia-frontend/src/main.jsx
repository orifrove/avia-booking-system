import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // ВОТ ОНА, ГЛАВНАЯ СТРОЧКА, КОТОРОЙ НЕ ХВАТАЛО!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
