import React, { FC } from 'react'
import { Link } from 'react-router-dom'
// import { UserType } from '../../../redux/slices/authSlice'
import logoutSvg from '../../../assets/logout.svg';
import settingsSvg from '../../../assets/settings.svg';
import { UserType } from '../../../redux/slices/authSlice';
import { useAppDispatch } from '../../../redux/store';
import { PayloadAction } from '@reduxjs/toolkit';
import './Profile.scss'

type Props = {
    data: UserType
    logout: () => PayloadAction<void>
}


const Porfile: FC<Props> = ({ logout, data }) => {
    
    const [open, setOpen] = React.useState<boolean>(false);
    const sortRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();


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
        dispatch(logout()); // Передаем полученное действие в dispatch
        setOpen(false);
        localStorage.removeItem('token')
        localStorage.removeItem('data')
    }
    return (
        <div className="profile" ref={sortRef}>
            <div className="profile__username" onClick={() => setOpen(!open)}>
                {data.login}
            </div>
            <div className="profile__img">
                <img src={data.imageUrl} alt="avatar" />
            </div>
            <ul className={`profile__list ${open && 'profile__list--active'}`}>
                <li className="profile__item">
                    <Link className='profile__link' to="/profile">Личный кабинет</Link>
                </li>
                <li className="profile__item">
                    <Link className='profile__link' to="/settings">Настройки <img src={settingsSvg} alt="settings" /></Link>
                </li>
                <li className="profile__item">
                    <button onClick={onClickLogout} className='profile__link'>Выйти <img src={logoutSvg} alt="logout" /></button>
                </li>
            </ul>
        </div>
    )
}
export default Porfile
