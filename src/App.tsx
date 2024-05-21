import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
import AuthRootComponent from "./pages/Auth/Auth.tsx";

import './App.scss'
import PrivateRoute from './utils/router/privateRoute.tsx';


const App: FC = () => {


  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          
          </Route>
          <Route path="/login" element={<AuthRootComponent />} />
            <Route path="/register" element={<AuthRootComponent />} />
        </Routes>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
