import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import { selectAuth, selectAuthS } from './redux/slices/authSlice.ts';
import { useSelector } from 'react-redux';
import './App.scss'


const App: FC = () => {
  const isAuth = useSelector(selectAuth);
  const { data, status } = useSelector(selectAuthS)

  useEffect(() => {
    if (isAuth) {
      data
    } else {
      console.log('не авторизован');
    }
  }, [status])

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
