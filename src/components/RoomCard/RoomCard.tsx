import { FC } from 'react'
import couchSvg from '../../assets/help/couch.svg'
import tableSvg from '../../assets/help/table.svg'
import { DataType } from '../../common/types/rooms'
import shareSvg from './../../assets/share.svg'
import './RoomCard.scss'
import { Link } from 'react-router-dom'
const RoomCard: FC<DataType> = (props: DataType) => {
	const { name, imageUrl, price, address, square, capacity, id } = props
	return (
		<li className='card'>
			<Link to={`/offices/${id}`}><div className='card__img'>
				<img src={imageUrl} alt='room' />
			</div>
				<div className='card__heading'>
					<div className='card__price'>{price}₺</div>
					<button onClick={(e) => e.preventDefault()
					} className='card__share'>
						<img src={shareSvg} alt='share' />
					</button>
				</div>
				<h5 className='card__name'>
					{name}
				</h5>
				<ul className='card__list'>
					<li className='card__item'>
						<img src={couchSvg} alt='кресло' />
						<span>{capacity}</span>
					</li>
					<li className='card__item'>
						<img src={tableSvg} alt='кресло' />
						<span>{square}</span>
					</li>
				</ul>
				<address className='card__address address'>{address}</address></Link>
		</li>
	)
}


export default RoomCard