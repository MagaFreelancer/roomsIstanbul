import './App.scss'
import Explanation from './components/Explanation/Explanation'
import Header from './components/Header/Header.tsx';
import Hero from './components/Hero/Hero.tsx'

function App() {

  return (
    <>
      <Header />
      <main className='main'>
        <Hero />
        <Explanation/>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
