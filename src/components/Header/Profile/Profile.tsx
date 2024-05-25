import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import logoutSvg from '../../../assets/logout.svg';
import settingsSvg from '../../../assets/settings.svg';
import { Avatar } from '@mui/material';
// import { UserType } from '../../../redux/slices/authSlice';
// import { useAppDispatch } from '../../../redux/store';
// import { PayloadAction } from '@reduxjs/toolkit';
import favouriteSvg from "../../../assets/favourite.svg"
import './Profile.scss'

type Props = {
    data: any
}


const Porfile: FC<Props> = ({ data }) => {

    const [open, setOpen] = React.useState<boolean>(false);
    const sortRef = React.useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
                setOpen(false);
            }
        };
        document.body.addEventListener("click", handleClickOutside);

        return () => {
            document.body.removeEventListener("click", handleClickOutside);
        };
    }, []);
    const onClickLogout = () => {
        // dispatch(logout()); // Передаем полученное действие в dispatch
        // setOpen(false);
        // localStorage.removeItem('token')
        // localStorage.removeItem('data')
    }
    return (
        <div className="profile" ref={sortRef}>
            <div className="profile__username" onClick={() => setOpen(!open)}>
                {data.username}
            </div>
            <Avatar
                alt="Remy Sharp"
                src={data.imageUrl}
                sx={{ width: 56, height: 56 }}
            />
            <ul className={`profile__list ${open && 'profile__list--active'}`}>
                <li className="profile__item">
                    <Link className='profile__link' to="/profile">Личный кабинет</Link>
                </li>
                <li className="profile__item">
                    <Link className='profile__link' to="/settings">Настройки <img src={settingsSvg} alt="settings" /></Link>
                </li>
                <li className="profile__item">
                    <Link className='profile__link' to="/favourite">Избранное <img src={favouriteSvg} alt="settings" /> </Link>
                </li>
                <li className="profile__item">
                    <button onClick={onClickLogout} className='profile__link'>Выйти <img src={logoutSvg} alt="logout" /></button>
                </li>
            </ul>
        </div>
    )
}
export default Porfile
