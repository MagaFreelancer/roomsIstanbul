import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";

import { useAppSelector } from "../../utils/hook";
import Porfile from "./Profile/Profile";
import './Header.scss';

const Header: FC = () => {
  const { user, isLogged } = useAppSelector(e => e.auth)

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/">
            <img src={logoSvg} alt="" />
          </Link>
          <ul className="header__menu">
            <li className="header__item"><NavLink to='/'>Главная</NavLink></li>
            <li className="header__item"><NavLink to='/offices'>Офисы</NavLink></li>
            <li className="header__item"><NavLink to='/about'>О нас</NavLink></li>
          </ul>

          {isLogged === false ? <div className="nav__links">
            <Link to="/login" className="nav__link">Авторизация/Регистрация</Link>
          </div> : <Porfile data={user.user} />
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
