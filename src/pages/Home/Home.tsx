import {FC} from 'react'
import Explanation from './../../components/Explanation/Explanation'
import Header from '../../components/Header/Header.tsx';
import Help from '../../components/Help/Help'
import Hero from '../../components/Hero/Hero.tsx'
import Rooms from '../../components/Rooms/Rooms'

const Home: FC = () => {
	
	return (
		<>
				<Hero />
				<Explanation/>
				<Help/>
				<Rooms/>
		</>
	)
}
export default Home
