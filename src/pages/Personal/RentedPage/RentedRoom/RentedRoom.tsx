import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IPropsRentedRoom } from '../../../../common/types/singlePage'
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Flex, Progress } from 'antd';
import { Rating } from '@mui/material';


const RentedRoom: FC<IPropsRentedRoom> = (props: IPropsRentedRoom): JSX.Element => {
    const { item, index, prec, diff } = props
    return (
        <li key={index} className="rented__item">
            <Link to="/" className='rented__link'>
                <div className="rented__image">
                    <img src={item.imageUrl} alt="" />
                </div>
                <div className="rented__info">
                    <div className="rented__descr">{item.info[0].slice(0, 50)}...</div>
                    <h6 className="rented__heading">{item.name}.</h6>
                    <div className="rented__rating">
                        <Rating name="half-rating-read" defaultValue={4.5} precision={0.5} readOnly />
                        <div className="rented__rating-text">4.5</div>
                        <div className="rented__rating-reviews">
                            12 reviews
                        </div>
                    </div>
                    <div className="rented__more">
                        <div className="rented__more-left">
                            <ul className="rented__conditions">
                                <li className="rented__conditions-item">
                                    <ChairIcon />
                                    <span> {item.capacity}</span>
                                </li>
                                <li className="rented__conditions-item">
                                    <SquareFootIcon />
                                    <span> {item.square}</span>
                                </li>
                            </ul>
                            <div className="rented__address">
                                <FmdGoodIcon /> <span>{item.address}</span>
                            </div>
                        </div>
                        <div className="rented__progress">
                            <Flex gap="small" wrap>
                                <Progress type="circle" size="small" percent={prec} format={() => `${diff}/${item.daysCount} Days`} />
                                {/* <Progress size="small" type="circle" percent={precent} format={() => 'Done'} /> */}
                            </Flex>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default RentedRoom