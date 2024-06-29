import { FC } from 'react'
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { DataType } from '../../common/types/rooms'
import './RoomCard.scss'
import { Link } from 'react-router-dom'
import { Rating } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
const RoomCard: FC<DataType> = (props: DataType) => {
	const { name, imageUrl, price, address, square, capacity, id, reviews, info } = props


	const rews = reviews?.map((item) => item.userReviews).reduce((acc, review) => {
		if (acc !== null && review !== null) {
			return acc + review;
		}
		return acc;
	}, 0) || 0;
	const averageRating = reviews?.length ? rews / reviews.length : 0;
	return (
		<li className='card'>
			<Link to={`/offices/${id}`}><div className='card__img'>
				<img src={imageUrl} alt='room' />
			</div>
				<h5 className='card__name'>
					{name}
				</h5>
				<div className='card__price'>{price}₺</div>

				<div className="card__descr">
					{info[0].slice(0, 41)}...
				</div>

				<div className="card__rating">
					<Rating emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />} name="hover-feedback" size="small" defaultValue={averageRating} precision={0.5} readOnly />
					<div className="card__rating-text">{averageRating}</div>
					<div className="card__rating-reviews">
						{reviews.length} reviews
					</div>
				</div>
				<ul className='card__conditions'>
					<li className="card__conditions-item">
						<ChairIcon />
						<span> {capacity}</span>
					</li>
					<li className="card__conditions-item">
						<SquareFootIcon />
						<span> {square}</span>
					</li>
				</ul>
				<address className='card__address'> <FmdGoodIcon />{address}</address>
			</Link>
		</li>
	)
}


export default RoomCard