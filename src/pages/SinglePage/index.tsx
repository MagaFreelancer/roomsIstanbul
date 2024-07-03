import React, { FC, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from './Calendar/Calendar';
import { addDays, format, subDays, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Popover from '@mui/material/Popover';
import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { fetchSingle } from '../../redux/thunk/single';
import { selectAuth } from '../../redux/slices/authSlice';
import { fetchPatchProfile } from '../../redux/thunk/auth';
import { IPayment, IUserData } from '../../common/types/auth';
import { Avatar, Popconfirm } from 'antd';
import { DataStatus, DataType, IComment } from '../../common/types/rooms';
import { IRentedRooms } from '../../common/types/personal';
import ImageGallery from './ImageGallery/ImageGallery';
import RoomDetails from './RoomDetails/RoomDetails';
import { Input } from 'antd';
import { fetchPatchRooms } from '../../redux/thunk/rooms';
import { UserOutlined } from '@ant-design/icons';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SinglePage.scss';
const { TextArea } = Input;

export type IProgress = { diff: number, prec: number, daysCount: number, salePrice: number }

const SinglePage: FC = (): JSX.Element => {
    const params = useParams()
    const idSingle = Number(params.id)

    // const { singleRoom } = useAppSelector(selectSingle)
    const { singleRoom, status } = useAppSelector(e => e.singleRoom)
    // const { items } = useAppSelector(selectRooms)
    const { user, isLogged } = useAppSelector(selectAuth)
    const [commentValue, setCommentValue] = useState('')
    const {
        name,
        imgs,
        info,
        price,
        reviews,
        capacity,
        square,
        address
    } = singleRoom

    const dispatch = useAppDispatch()
    let favoriteValue;

    if (isLogged) {
        favoriteValue = user.data.favourites.findIndex(item => item === idSingle);

    }
    const id = user.data.id;

    const rews = reviews?.map((item) => item.userReviews).reduce((acc, review) => {
        if (acc !== null && review !== null) {
            return acc + review;
        }
        return acc;
    }, 0) || 0;
    const averageRating = reviews?.length ? rews / reviews.length : 0;
    const [value, setValue] = useState<number | null>(averageRating); //rating

    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState<IProgress>({
        diff: 0,
        prec: 0,
        daysCount: 0,
        salePrice: 0
    })

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const changeRating = (e: number | null) => {
        setValue(e);
        let indexReviews: number | null = null;
        const reviewsObj = singleRoom.reviews.find((item, index) => {
            if (item.createId === user.data.createId) {
                indexReviews = index;
                return item;
            }
            return undefined;
        });

        const changedData = { ...singleRoom, reviews: [...singleRoom.reviews] };

        if (indexReviews !== null && reviewsObj) {
            changedData.reviews.splice(indexReviews, 1, {
                createId: user.data.createId,
                userReviews: e,
            });
        } else {
            changedData.reviews.push({
                createId: user.data.createId,
                userReviews: e
            });
        }
        dispatch(fetchPatchRooms(changedData));
    }
    const open = Boolean(anchorEl);
    const idPop = open ? 'simple-popover' : undefined;
    const [valueDateRangePicker, setValueDateRangePicker] = useState<Range[] | undefined>([
        {
            startDate: subDays(new Date(), 0),
            endDate: addDays(new Date(), 1),
            key: "selection",
        },
    ]);
    const [activeImg, setActiveImg] = useState<number>(0)



    //календарь
    const formattedValueDateRangePickerStartDate = valueDateRangePicker?.[0].startDate
        ? format(valueDateRangePicker[0].startDate, "dd.MM.yyyy", { locale: enUS })
        : "";
    const formattedValueDateRangePickerEndDate = valueDateRangePicker?.[0].endDate
        ? format(valueDateRangePicker[0].endDate, "dd.MM.yyyy", { locale: enUS })
        : "";


    const handleChangeValueDateRangePicker = useCallback((ranges: RangeKeyDict) => {
        const { selection } = ranges;
        setValueDateRangePicker([selection]);
    }, []);

    const daysCount = valueDateRangePicker?.[0].startDate && valueDateRangePicker?.[0].endDate ?
        differenceInDays(valueDateRangePicker[0].endDate, valueDateRangePicker[0].startDate) + 1 :
        0;


    const daysPriceResult = daysCount * price ///===========
    const salePrice = (daysPriceResult / 100) * 80 //==========

    const getRoom = async (id: number) => {
        await dispatch(fetchSingle(id))
    }
    const onClickRent = async () => {

        if (id === undefined) return;
        if (salePrice > user.data.balance) return
        let status: null | "activate" | "extend" = null
        let changedData: IUserData = { ...user.data };
        const localRentedRooms = [...user.data.rentedRooms];
        const activeRentIndex = localRentedRooms.findIndex(item => item.id === idSingle);

        if (activeRentIndex !== -1) {
            const activeRent = localRentedRooms[activeRentIndex];
            localRentedRooms[activeRentIndex] = {
                ...activeRent,
                daysCount: daysCount + activeRent.daysCount,
                salePrice: activeRent.salePrice + salePrice,
            };
            status = 'extend'
        } else {
            localRentedRooms.push({
                daysCount,
                id: idSingle,
                salePrice,
                rentedDate: new Date(),
            });
            status = 'activate'

        }
        const lastId = changedData.payments.replenished.length > 0 ? changedData.payments.replenished[changedData.payments.replenished.length - 1].id : 1
        const rentedStory = user.data.story.rentedStory
        const rentedStoryLastId = rentedStory.length > 0 ?
            rentedStory[rentedStory.length - 1].id + 1 : 0
        const newPayment: IPayment = {
            id: lastId,
            sum: salePrice,
            type: 'decrement',
            date: new Date(),
            balance: user.data.balance - salePrice
        }
        const newPaymentStory = {
            id: rentedStoryLastId,
            RentedRoomsId: singleRoom.id,
            date: new Date(),
            status
        }

        changedData = {
            ...user.data,
            balance: user.data.balance - salePrice,
            payments: {
                replenished: [
                    ...user.data.payments.replenished,
                    newPayment
                ]
            },
            story: {
                rentedStory: [
                    ...user.data.story.rentedStory,
                    newPaymentStory
                ],
                profileStory: user.data.story.profileStory,
                favouritesStory: user.data.story.favouritesStory
            },
            rentedRooms: localRentedRooms
        } as IUserData;

        await dispatch(fetchPatchProfile({ id, changedData }));

    }
    const onClickFavourite = async () => {
        let status: null | "disable" | "activate" = null
        if (id !== undefined) {
            const favourites: number[] = [...user.data.favourites]
            const indexFavourit = favourites.indexOf(idSingle)
            if (indexFavourit !== -1) {
                favourites.splice(indexFavourit, 1)
                status = "disable"
            } else {
                favourites.push(idSingle)
                status = "activate"
            }
            const favouritesStory = user.data.story.favouritesStory
            const favouritesStoryLastId = favouritesStory.length > 0 ?
                favouritesStory[favouritesStory.length - 1].id + 1 : 0

            const changedData = {
                ...user.data,
                favourites: favourites,
                story: {
                    rentedStory: user.data.story.rentedStory,
                    profileStory: user.data.story.profileStory,
                    favouritesStory: [
                        ...user.data.story.favouritesStory,
                        {
                            id: favouritesStoryLastId,
                            favouritedRoomsId: singleRoom.id,
                            date: new Date(),
                            status
                        }
                    ]
                }
            } as IUserData;
            await dispatch(fetchPatchProfile({ id, changedData }))
        }
    }
    const onClickComment = async (e: any) => {
        e.preventDefault()
        const localUser = user.data

        const statusComment = singleRoom.comments.findIndex(item => item.createId === localUser.createId)

        if (statusComment === -1) {
            const commentObj: IComment = {
                username: localUser.username,
                imageUrl: localUser.imageUrl,
                addedDate: new Date(),
                comment: commentValue,
                createId: localUser.createId,
                rating: value
            }
            const changedData: DataType = {
                ...singleRoom,
                comments: [...singleRoom.comments, commentObj]
            }
            await dispatch(fetchPatchRooms(changedData))
        } else {
            return false
        }
        setCommentValue('')
    }


    useEffect(() => {
        getRoom(idSingle)
    }, [])
    useEffect(() => {
        setValue(averageRating)
    }, [status])
    useEffect(() => {
        const rentedRoom = user.data.rentedRooms?.find(item => item.id === idSingle) as IRentedRooms | undefined;

        if (rentedRoom) {
            const nowDate = new Date()
            const diff = differenceInDays(nowDate, rentedRoom.rentedDate) + 1
            const prec = diff / rentedRoom.daysCount * 100

            setProgress({
                prec,
                diff,
                daysCount: rentedRoom.daysCount,
                salePrice: rentedRoom.salePrice
            })
        }
    }, [isLogged])


    if (status != DataStatus.SUCCESS) {
        return <div>Loading...</div>;
    }

    return (
        <section className='singlepage'>
            <div className="container singlepage__container">
                <div className="singlepage__col">
                    <ImageGallery imgs={imgs} activeImg={activeImg} setActiveImg={(e) => setActiveImg(e)} />
                </div>
                <div className="singlepage__col">
                    <RoomDetails
                        name={name}
                        info={info}
                        capacity={capacity}
                        square={square}
                        address={address}
                        progress={progress}
                        value={value}
                        changeRating={(e) => changeRating(e)}
                        averageRating={averageRating}
                        reviewsCount={reviews.length}

                    />
                    <div className="singlepage__date-wrapper">
                        <div className="singlepage__price">{salePrice} ₺ <span className='singlepage__sale-price'>{daysPriceResult} ₺</span></div>

                        <div className="button-blue singlepage__date-btn" onClick={handleClick} aria-describedby={idPop}  >
                            <CalendarTodayIcon className='singlepage__date-svg' />
                            <div className="singlepage__date-info">
                                <div className="singlepage__date-heading">Даты аренды</div>
                                <div className="singlepage__date-col">
                                    {formattedValueDateRangePickerStartDate}
                                    —
                                    {formattedValueDateRangePickerEndDate}
                                    <span className="singlepage__date-days">{daysCount} дней</span>
                                </div>
                            </div>
                        </div>
                        <div className="singlepage__popup">
                            <Popover
                                id={idPop}
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                            >
                                <Calendar
                                    editableDateInputs={true}
                                    locale={enUS}
                                    minDate={addDays(new Date(), 0)}
                                    onChange={handleChangeValueDateRangePicker}
                                    ranges={valueDateRangePicker}
                                    showDateDisplay={true}
                                    showPreview={true}
                                />
                            </Popover>
                        </div>

                    </div>
                    <div className="singlepage__btns">
                        <Popconfirm
                            title="Title"
                            description="Вы уверены в аренде данного офиса?"
                            onConfirm={onClickRent}
                            onOpenChange={() => console.log('open change')}
                        >
                            <button className="singlepage__btn button-blue button-blue--big">{`${progress.daysCount !== 0 ? "Добавить аренду" : "Арендовать"}`}</button>

                        </Popconfirm>
                        <button onClick={onClickFavourite} className="singlepage__btn button-white button-white--big">{`${favoriteValue !== -1 ? "Убрать из избранное" : "Добавить в избранное"}`}</button>
                    </div>
                </div>
                <div className="singlepage__col singlepage__col--comments">
                    <h3 className="singlepage__col-title">
                        {singleRoom.comments.length} Комментария
                    </h3>
                    <div className="singlepage__comments">
                        <form className="singlepage__comments-form">
                            <div className="singlepage__comments-top">
                                <Avatar src={user.data.imageUrl} size={64} icon={<UserOutlined />} ></Avatar>
                                <TextArea
                                    value={commentValue}
                                    onChange={(e) => setCommentValue(e.target.value)}
                                    placeholder="Controlled autosize"
                                    autoSize={{
                                        minRows: 3,
                                        maxRows: 5,
                                    }}
                                />
                            </div>
                            <div className="singlepage__comments-btn">
                                <button className='button-blue' onClick={onClickComment}>Оставить комментарий</button>
                            </div>
                        </form>
                        <ul className="singlepage__comments-list">
                            {singleRoom.comments.map((item, index) => {
                                let day: string | number = new Date(item.addedDate).getDate()
                                let month: string | number = new Date(item.addedDate).getMonth()
                                const year: string | number = new Date(item.addedDate).getFullYear()

                                if (day < 10) {
                                    day = '0' + day
                                } if (month < 10) {
                                    month = '0' + month
                                }
                                return (
                                    <li key={index} className="singlepage__comments-item">
                                        <div className="singlepage__comments-heading">
                                            <div className="singlepage__comments-img">
                                                <Avatar src={item.imageUrl} size={64} icon={<UserOutlined />} />
                                            </div>
                                            <div className="singlepage__comments-info">
                                                <h6 className="singlepage__comments-username">
                                                    {item.username}
                                                </h6>
                                                <div className="singlepage__comments-rating">
                                                    <Rating emptyIcon={<StarIcon style={{ opacity: 0.45 }} fontSize="inherit" />} name="hover-feedback" size="small" value={item.rating} precision={0.25} readOnly />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="singlepage__comments-text">
                                            {item.comment}
                                        </p>
                                        <div className="singlepage__comments-date">
                                            {`${day}:${month}:${year}`}
                                        </div>
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </div>
            </div >
        </section >
    )
}

export default SinglePage