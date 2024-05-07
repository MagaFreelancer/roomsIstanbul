import React, { FC } from 'react'
import { Link } from 'react-router-dom'
// import { UserType } from '../../../redux/slices/authSlice'
import logoutSvg from '../../../assets/logout.svg';
import settingsSvg from '../../../assets/settings.svg';
import './Profile.scss'



const Porfile: FC = () => {

    const [open, setOpen] = React.useState<boolean>(true);
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
    return (
        <div className="profile" ref={sortRef}>
            <div className="profile__username" onClick={() => setOpen(!open)}>
                Elmaga
            </div>
            <div className="profile__img">
                <img src="https://mui.com/static/images/avatar/1.jpg" alt="avatar" />
            </div>
            <ul className={`profile__list ${open && 'profile__list--active'}`}>
                <li className="profile__item">
                    <Link className='profile__link' to="/profile">Личный кабинет</Link>
                </li>
                <li className="profile__item">
                    <Link className='profile__link' to="/settings">Настройки <img src={settingsSvg} alt="settings" /></Link>
                </li>
                <li className="profile__item">
                    <Link className='profile__link' to="/settings">Выйти <img src={logoutSvg} alt="logout" /></Link>
                </li>
            </ul>
        </div>
    )
}
export default Porfile
