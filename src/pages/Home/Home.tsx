import { FC, useEffect } from 'react'
import Explanation from './../../components/Explanation/Explanation'
import { useAppDispatch, useAppSelector } from '../../utils/hook/index.ts'
import Help from '../../components/Help/Help'
import Hero from '../../components/Hero/Hero.tsx'
import RoomCard from '../../components/RoomCard/RoomCard.tsx'
import { selectRooms } from '../../redux/slices/roomsSlice.ts'
import { fetchAllRooms } from '../../redux/thunk/allRooms/index.ts'

const Home: FC = () => {
	const { items, status } = useAppSelector(selectRooms)
	const dispatch = useAppDispatch()

	const getCards = async () => {
		await dispatch(fetchAllRooms())
	}
	useEffect(() => {
		getCards()
	}, [])
	return (

		<>
			<Hero status={status} items={items} />
			<Explanation />
			<Help />
			<section className='rooms'>
				<div className='container'>
					<h2 className='rooms__title title'>
						Our most trending properties
					</h2>
					<p className='rooms__subtitle subtitle'>
						It is a long established fact that a reader will be distracted by the readable
						content of a page when looking at its layout. The point of using.
					</p>
					<ul className='rooms__cards'>
						{items.map((item, index) => (
							<RoomCard key={index} {...item} />
						))}
					</ul>
				</div>
			</section>
		</>
	)
}
export default Home
