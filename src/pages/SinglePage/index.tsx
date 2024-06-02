import React, { FC, useCallback, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Rating from '@mui/material/Rating';
import { Range, RangeKeyDict } from "react-date-range";
import Calendar from './Calendar/Calendar';
import { addDays, format, subDays, differenceInDays } from 'date-fns';
import { enUS } from 'date-fns/locale';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Popover from '@mui/material/Popover';

import { useAppDispatch, useAppSelector } from '../../utils/hook';
import { selectSingle } from '../../redux/slices/singleSlice';
import { fetchSingle } from '../../redux/thunk/single';
import { selectAuth } from '../../redux/slices/authSlice';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './SinglePage.scss';

const SinglePage: FC = (): JSX.Element => {
    const { id } = useParams()
    const { singleRoom } = useAppSelector(selectSingle)

    const { user, isLogged } = useAppSelector(selectAuth)
    const { name, imgs, info, price } = singleRoom
    const [value, setValue] = useState<number | null>(3.5); //rating
    const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
    const dispatch = useAppDispatch()
    let favoriteValue;

    if (isLogged) {
        favoriteValue = user.data.favorite.find(item => item === id)
    }

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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

    const getRoom = async (id: string | undefined) => {
        dispatch(fetchSingle(id))
    }

    useEffect(() => {
        getRoom(id)
    }, [])
    return (
        <section className='singlepage'>
            <div className="container singlepage__container">
                <div className="singlepage__col">
                    <div className="singlepage__slider">
                        <ul className="singlepage__vertical-list">
                            {imgs.map((item, index) => (
                                <li key={index} onClick={() => setActiveImg(index)} className={`singlepage__vertical-item ${index === activeImg && "singlepage__vertical-item--active"}`}><img src={item} alt="" /></li>
                            ))}
                        </ul>
                        <div className="singlepage__img">
                            {<img src={imgs[activeImg]} alt="office img" />}
                        </div>
                    </div>
                </div>
                <div className="singlepage__col">
                    <h2 className="singlepage__title">
                        {name}
                    </h2>
                    <div className="singlepage__rating">
                        <Rating
                            name="simple-controlled"
                            value={value}
                            precision={0.5}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                            }}
                        />
                    </div>
                    <ul className="singlepage__info">
                        {info.map((item, index) => (
                            <li className='singlepage__info-item' key={index}>{item}</li>
                        ))}
                    </ul>
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
                        <button className="singlepage__btn button-blue button-blue--big">Арендовать</button>
                        <button className="singlepage__btn button-white button-white--big">{`${favoriteValue ? "Убрать из избранное" : "Добавить в избранное"}`}</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SinglePage