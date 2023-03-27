import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppLogin from './AppLogin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppCadastro from './AppCadastro'
import VerificadorRoute from './componets/VerificadorRoute'
import _404 from './_404'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<AppLogin />} />
        <Route element={<VerificadorRoute />}>
          <Route index path='/piteroparker/' element={<App />} />
          <Route path='/Cadastro/' element={<AppCadastro />} />
          <Route path='*' element={<_404/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
