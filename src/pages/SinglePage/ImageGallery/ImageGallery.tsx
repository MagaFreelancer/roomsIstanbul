import React, { FC } from 'react';

interface ImageGalleryProps {
    imgs: string[];
    activeImg: number;
    setActiveImg: (index: number) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ imgs, activeImg, setActiveImg }) => {
    return (
        <div className="singlepage__slider">
            <ul className="singlepage__vertical-list">
                {imgs.map((item, index) => (
                    <li key={index} onClick={() => setActiveImg(index)} className={`singlepage__vertical-item ${index === activeImg && "singlepage__vertical-item--active"}`}><img src={item} alt="" /></li>
                ))}
            </ul>
            <div className="singlepage__img">
                <img src={imgs[activeImg]} alt="office img" />
            </div>
        </div>
    );
}

export default ImageGallery;
