import React, { FC } from 'react';
import Rating from '@mui/material/Rating';

export interface RatingSectionProps {
    value: number | null;
    setValue: (value: number | null) => void;
    averageRating: number;
    reviewsCount: number;
}

const RatingSection: FC<RatingSectionProps> = ({ value, setValue, averageRating, reviewsCount }) => {
    return (
        <div className="singlepage__rating">
            <Rating
                name="simple-controlled"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            />
            <div className="singlepage__rating-reviews">{averageRating}</div>
            <div className="singlepage__rating-count">
                ({reviewsCount} reviews)
            </div>
        </div>
    )
}
export default RatingSection

