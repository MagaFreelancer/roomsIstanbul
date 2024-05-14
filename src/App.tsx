import { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
import AuthRootComponent from "./components/Auth/Auth.tsx";

import './App.scss'


const App: FC = () => {


  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthRootComponent />} />
          <Route path="/register" element={<AuthRootComponent />} />
        </Routes>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
