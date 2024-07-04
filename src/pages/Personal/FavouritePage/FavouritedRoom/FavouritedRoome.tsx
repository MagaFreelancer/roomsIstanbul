import React, { FC, useState } from 'react'
import ChairIcon from '@mui/icons-material/Chair';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { Popover, Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IPropsFavouritedRoom } from '../../../../common/types/personal';
import { fetchPatchProfile } from '../../../../redux/thunk/auth';
import { IUserData } from '../../../../common/types/auth';

const FavouritedRoom: FC<IPropsFavouritedRoom> = (props: IPropsFavouritedRoom): JSX.Element => {
    const { item, dispatch, user } = props

    const rews = item.reviews?.map((item) => item.userReviews).reduce((acc, review) => {
        if (acc !== null && review !== null) {
            return acc + review;
        }
        return acc;
    }, 0) || 0;
    const averageRating = item.reviews?.length ? rews / item.reviews.length : 0;

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);


    const onClickDeleteFavourite = async () => {
        if (user.id === undefined) return


        const favourites = [...user.favourites];

        favourites.splice(favourites.indexOf(item.id), 1)
        const favouritesStory = user.story.favouritesStory
        const favouritesStoryLastId = favouritesStory.length > 0 ?
            favouritesStory[favouritesStory.length - 1].id + 1 : 0

        const changedData = {
            ...user,
            favourites: [...favourites],
            story: {
                rentedStory: user.story.rentedStory,
                profileStory: user.story.profileStory,
                favouritesStory: [
                    ...user.story.favouritesStory,
                    {
                        id: favouritesStoryLastId,
                        favouritedRoomsId: item.id,
                        date: new Date(),
                        status: "disable"
                    }
                ]
            }
        } as IUserData
        await dispatch(fetchPatchProfile({ id: user.id, changedData }))
    }
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <li className="favourite__item">
            <button onClick={handleClick} className="favourite__setting" aria-describedby={id} >
                <MoreVertIcon />
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ul className="favourite__more-list">
                    <li className="favourite__more-item">
                        <Link className='favourite__more-btn' to={`/offices/${item.id}`}><OpenInNewIcon />Перейти на страницу</Link>
                    </li>
                    <li className="favourite__more-item ">
                        <button className='favourite__more-btn favourite__more-btn--delete' onClick={onClickDeleteFavourite}><DeleteIcon /> Удалить из избранное</button>
                    </li>
                </ul>
            </Popover>
            <div className="favourite__image">
                <img src={item.imageUrl} alt="" />
            </div>
            <div className="favourite__info">
                <div className="favourite__descr">{item.info[0].slice(0, 50)}...</div>
                <h6 className="favourite__heading">{item.name}.</h6>
                <div className="favourite__rating">
                    <Rating emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />} name="hover-feedback" size="small" defaultValue={averageRating} precision={0.5} readOnly />
                    <div className="favourite__rating-text">{averageRating}</div>
                    <div className="favourite__rating-reviews">
                        {item.reviews.length} reviews
                    </div>
                </div>
                <div className="favourite__more">
                    <div className="favourite__more-left">
                        <ul className="favourite__conditions">
                            <li className="favourite__conditions-item">
                                <ChairIcon />
                                <span> {item.capacity}</span>
                            </li>
                            <li className="favourite__conditions-item">
                                <SquareFootIcon />
                                <span> {item.square}</span>
                            </li>
                        </ul>
                        <div className="favourite__address">
                            <FmdGoodIcon /> <span>{item.address}</span>
                        </div>
                    </div>

                </div>
            </div>
        </li>
    )
}

export default FavouritedRoom