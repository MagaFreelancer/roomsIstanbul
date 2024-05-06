import { FC, useEffect } from 'react'
import RoomCard from '../RoomCard/RoomCard'
import { useSelector} from 'react-redux'
import { selectRooms, DataStatus } from '../../redux/slices/roomsSlice'
import { fetchRooms } from '../../redux/slices/roomsSlice'
import { useAppDispatch } from '../../redux/store'
import './Rooms.scss'

const Rooms: FC = () => {
	const { items, status } = useSelector(selectRooms)
	const dispatch = useAppDispatch()

	const getCards = async () => {
		dispatch(fetchRooms())
	}
	useEffect(() => {
		getCards()
	}, [])

	if (status !== DataStatus.SUCCESS) {
		return 'загрузка'
	}
	return (
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
	)
}

export default Rooms
