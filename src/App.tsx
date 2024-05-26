import { FC, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header/Header.tsx';
import Home from './pages/Home/Home'
import AuthRootComponent from "./pages/Auth/Auth.tsx";

// import PrivateRoute from './utils/router/privateRoute.tsx';
import { fetchAuthMe } from './redux/thunk/auth/index.ts';
import { useAppDispatch, useAuth } from './utils/hook/index.ts';
import Office from './pages/Office/index.tsx';
import './App.scss'


const App: FC = () => {
  const dispatch = useAppDispatch()
  const auth = useAuth()


  useEffect(() => {
    if (auth) {
      dispatch(fetchAuthMe())
    }
  }, [])

  return (
    <>
      <Header />
      <main className='main'>
        <Routes>
          {/* <Route element={<PrivateRoute />}>
          </Route> */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<AuthRootComponent />} />
          <Route path="/register" element={<AuthRootComponent />} />
          <Route path='/offices' element={<Office />} />
        </Routes>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
