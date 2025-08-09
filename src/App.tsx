import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import routeList from './routes/list'
import { Outlet, useRoutes, BrowserRouter } from 'react-router-dom';
function App() {
  const RouteElement = () => {
    return useRoutes(routeList)
  }
  return (
      <BrowserRouter>
        <RouteElement />
      </BrowserRouter>
  )
}

export default App
