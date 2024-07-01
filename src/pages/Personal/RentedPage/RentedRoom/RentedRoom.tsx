import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { IPropsRentedRoom } from '../../../../common/types/singlePage'
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Flex, Progress } from 'antd';
import { Rating, Popover } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchPatchProfile } from '../../../../redux/thunk/auth';

const delay = async (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}
const RentedRoom: FC<IPropsRentedRoom> = (props: IPropsRentedRoom): JSX.Element => {
    const { item, prec, diff, user, dispatch } = props
    const [anchorEle, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const [progress, setProgress] = useState(0);
    const rews = item.reviews?.map((item) => item.userReviews).reduce((acc, review) => {
        if (acc !== null && review !== null) {
            return acc + review;
        }
        return acc;
    }, 0) || 0;
    const averageRating = item.reviews?.length ? rews / item.reviews.length : 0;
    const onClickDeleteRent = async () => {
        if (user.id === undefined) return
        const rentedRooms = [...user.rentedRooms];
        const rentedRoomsIndex = rentedRooms.findIndex(el => el.id === item.id)
        rentedRooms.splice(rentedRoomsIndex, 1)
        const changedData = {
            ...user,
            rentedRooms: [...rentedRooms]
        }
        await dispatch(fetchPatchProfile({ id: user.id, changedData }))
    }
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ShowProgress = async () => {
        for (let i = 0; i < prec; i++) {
            await delay(25)
            setProgress(i)
        }
    }
    const open = Boolean(anchorEle);
    const id = open ? 'simple-popover' : undefined;
    useEffect(() => {
        ShowProgress()
    }, [])
    return (
        <li className="rented__item">
            <button onClick={handleClick} className="rented__setting" aria-describedby={id} >
                <MoreVertIcon />
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEle}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ul className="rented__more-list">
                    <li className="rented__more-item">
                        <Link className='rented__more-btn' to={`/offices/${item.id}`}><OpenInNewIcon />Перейти на страницу</Link>
                    </li>
                    <li className="rented__more-item ">
                        <button className='rented__more-btn rented__more-btn--delete' onClick={onClickDeleteRent}><DeleteIcon /> Отменить аренду</button>
                    </li>
                </ul>
            </Popover>
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
        </li>
    )
}

export default RentedRoom