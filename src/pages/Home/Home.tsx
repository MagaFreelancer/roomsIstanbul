import { FC, useEffect } from 'react'
import Explanation from './Explanation/Explanation.tsx'
import { useAppDispatch, useAppSelector, useStatus } from '../../utils/hook/index.ts'
import Help from './Help/Help.tsx'
import Hero from './Hero/Hero.tsx'
import RoomCard from '../../components/RoomCard/RoomCard.tsx'
import { selectRooms } from '../../redux/slices/roomsSlice.ts'
import { fetchAllRooms } from '../../redux/thunk/allRooms/index.ts'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import "./Home.scss"
const Home: FC = () => {
	const { items, status } = useAppSelector(selectRooms)
	const loading = useStatus(status)
	const dispatch = useAppDispatch()

	const getCards = async () => {
		await dispatch(fetchAllRooms())
	}
	useEffect(() => {
		getCards()
	}, [])
	return (

		<>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

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
