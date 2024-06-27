import React, { FC } from 'react';
import ChairIcon from '@mui/icons-material/Chair';
import RentedInfo from '.././RentedInfo/RentedInfo';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import RatingSection, { RatingSectionProps } from './RatingSection/RatingSection';
import { IProgress } from '..';

interface RoomDetailsProps extends RatingSectionProps {
    name: string;
    info: string[];
    capacity: number;
    square: string;
    address: string;
    progress: IProgress;
}

const RoomDetails: FC<RoomDetailsProps> = ({ name, info, capacity, square, address, progress, value,
    setValue,
    averageRating,
    reviewsCount, }) => {
    return (
        <>
            <h2 className="singlepage__title">
                {name}
            </h2>
            <RatingSection
                value={value}
                setValue={setValue}
                averageRating={averageRating}
                reviewsCount={reviewsCount}
            />
            <div className="singlepage__info">
                <h4 className="singlepage__info-title singlepage__heading">Описание</h4>
                <ul className="singlepage__info-list">
                    {info.map((item, index) => (
                        <li className='singlepage__info-item' key={index}>{item}</li>
                    ))}
                </ul>
            </div>
            <div className="singlepage__moreinfo">
                <h4 className="singlepage__heading">Дополнительная информация</h4>
                <ul className="singlepage__conditions">
                    <li className="singlepage__conditions-item">
                        <ChairIcon />
                        <span> {capacity}</span>
                    </li>
                    <li className="singlepage__conditions-item">
                        <SquareFootIcon />
                        <span> {square}</span>
                    </li>
                </ul>
                <div className="singlepage__address">
                    <FmdGoodIcon /> <span>{address}</span>
                </div>
                {progress.daysCount !== 0 && <RentedInfo progress={progress} />}
            </div>
        </>
    );
}

export default RoomDetails;
