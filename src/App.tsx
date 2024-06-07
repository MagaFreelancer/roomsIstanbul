import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
// import PrivateRoute from './utils/router/privateRoute.tsx';
import { fetchAuthMe } from './redux/thunk/auth/index.ts';
import { useAppDispatch, useAuth } from './utils/hook/index.ts';
import Office from './pages/Office/index.tsx';
import SinglePage from './pages/SinglePage/index.tsx';
import Login from './pages/Login/Login.tsx';
import Register from './pages/Register/Register.tsx';
import Footer from './components/Footer/Footer.tsx';

import './App.scss'
import Personal from './pages/Personal/Personal.tsx';

const App: FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAuth()

  useEffect(() => {

    if (auth) {
      dispatch(fetchAuthMe())
    }
  }, [])

  return (
    <div className='wrapper'>
      <Header />
      <main className='main'>
        <Routes>
          {/* <Route element={<PrivateRoute />}>
          </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path='/offices' element={<Office />} />
          <Route path='/offices/:id' element={<SinglePage />} />
          <Route path='/personal/*' element={<Personal />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
