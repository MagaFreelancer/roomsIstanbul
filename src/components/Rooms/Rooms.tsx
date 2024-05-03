import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import RoomCard from '../RoomCard/RoomCard'
import "./Rooms.scss"
export type DataType = {
	id: number,
	name: string,
	price: number,
	couch: number,
	table: number,
	address: string,
	imageUrl: string
}
const Rooms: FC = () => {
	const [cards, setCards] = useState<Array<DataType> | null> (null)
	
	
	const getCards = async () => {
		const { data } = await axios.get('https://0175150936641c7d.mokky.dev/rooms');
		return data
	}
	useEffect(() => {
		getCards().then(data => {
			setCards(data)
		})
	}, [])
	
	if(cards === null) {
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
					{cards.map((item,index) => (
						<RoomCard  key={index} {...item}/>
					))}
				</ul>
			</div>
		</section>
	)
}

export default Rooms
