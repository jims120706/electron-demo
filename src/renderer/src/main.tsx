import './assets/main.css'

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './store/index'
import { Provider } from 'react-redux'
  
window.electron.ipcRenderer.on('init-login-manager', (arg) => {  
  console.log("ipcRenderer", arg); // 输出: Hello from main process!  
});  

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
