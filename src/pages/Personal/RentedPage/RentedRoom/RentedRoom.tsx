import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPropsRentedRoom } from '../../../../common/types/singlePage'
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Flex, Progress } from 'antd';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const RentedRoom: FC<IPropsRentedRoom> = (props: IPropsRentedRoom): JSX.Element => {
    const { item, prec, diff } = props
    
    const [progress, setProgress] = useState(0);
    const rews = item.reviews?.map((item) => item.userReviews).reduce((acc, review) => {
        if (acc !== null && review !== null) {
            return acc + review;
        }
        return acc;
    }, 0) || 0;
    const averageRating = item.reviews?.length ? rews / item.reviews.length : 0;


    const ShowProgress = async () => {
        for (let i = 0; i < prec; i++) {
            await delay(25)
            setProgress(i)
        }
    }
    useEffect(() => {
        ShowProgress()
    }, [])
    return (
        <li className="rented__item">
            <Link to="/" className='rented__link'>
                <div className="rented__setting" onClick={(e) => e.preventDefault()}>
                    <MoreVertIcon />
                </div>
                <div className="rented__image">
                    <img src={item.imageUrl} alt="" />
                </div>
                <div className="rented__info">
                    <div className="rented__descr">{item.info[0].slice(0, 50)}...</div>
                    <h6 className="rented__heading">{item.name}.</h6>
                    <div className="rented__rating">
                        <Rating emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />} name="hover-feedback" size="small" defaultValue={averageRating} precision={0.5} readOnly />
                        <div className="rented__rating-text">{averageRating}</div>
                        <div className="rented__rating-reviews">
                            {item.reviews.length} reviews
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
                                {diff === item.daysCount ?
                                    <Progress size="small" type="circle" percent={100} format={() => 'Done'} />
                                    :
                                    <Progress type="circle" size="small" percent={progress} format={() => `${diff}/${item.daysCount} Days`} />
                                }
                            </Flex>
                        </div>
                    </div>
                </div>
            </Link>
        </li>
    )
}

export default RentedRoom