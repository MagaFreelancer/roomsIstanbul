import './App.scss'
import Explanation from './components/Explanation/Explanation'
import Header from './components/Header/Header.tsx';
import Help from './components/Help/Help'
import Hero from './components/Hero/Hero.tsx'
import RoomCard from './components/RoomCard/RoomCard'
import Rooms from './components/Rooms/Rooms'

function App() {

  return (
    <>
      <Header />
      <main className='main'>
        <Hero />
        <Explanation/>
        <Help/>
        <Rooms/>
      </main>
      <footer className='footer'></footer>
    </>
  )
}

export default App
