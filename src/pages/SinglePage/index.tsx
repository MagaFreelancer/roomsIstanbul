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
import { IRooms, IUserData } from '../../common/types/auth';
import { Popconfirm } from 'antd';
import { DataStatus } from '../../common/types/rooms';
import { IRentedRooms } from '../../common/types/personal';
import ImageGallery from './ImageGallery/ImageGallery';
import RoomDetails from './RoomDetails/RoomDetails';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SinglePage.scss';
import { fetchPatchRooms } from '../../redux/thunk/rooms';

export type IProgress = { diff: number, prec: number, daysCount: number, salePrice: number }

const SinglePage: FC = (): JSX.Element => {
    const params = useParams()
    const idSingle = Number(params.id)

    // const { singleRoom } = useAppSelector(selectSingle)
    const { singleRoom, status } = useAppSelector(e => e.singleRoom)
    // const { items } = useAppSelector(selectRooms)
    const { user, isLogged } = useAppSelector(selectAuth)

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
        favoriteValue = user.data.favorite.findIndex(item => item === idSingle);

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

        const changedData: IUserData = { ...user.data };
        const localRentedRooms = [...user.data.rentedRooms];
        const activeRentIndex = localRentedRooms.findIndex(item => item.id === idSingle);

        if (activeRentIndex !== -1) {
            const activeRent = localRentedRooms[activeRentIndex];
            localRentedRooms[activeRentIndex] = {
                ...activeRent,
                daysCount: daysCount + activeRent.daysCount,
                salePrice: activeRent.salePrice + salePrice,
            };
        } else {
            localRentedRooms.push({
                daysCount,
                id: idSingle,
                salePrice,
                rentedDate: new Date(),
            });
        }

        changedData.rentedRooms = localRentedRooms;
        await dispatch(fetchPatchProfile({ id, changedData }));
    }
    const onClickFavourite = async () => {
        if (id !== undefined) {
            const favourites: number[] = [...user.data.favorite]
            const indexFavourit = favourites.indexOf(idSingle)
            if (indexFavourit !== -1) {
                favourites.splice(indexFavourit, 1)
            } else {

                favourites.push(idSingle)
            }
            const changedData: IUserData = { ...user.data, favorite: favourites };
            await dispatch(fetchPatchProfile({ id, changedData }))
        }
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
            </div>
        </section>
    )
}

export default SinglePage