import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import singSvg from '../../assets/sign.svg'
import registerSvg from '../../assets/register.svg'
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
            <Link to="/login" className="button-blue button--big"><img className="header__btn-img" src={singSvg} alt="" /></Link>
            <Link to="/register" className="button-blue button--big" ><img className="header__btn-img" src={registerSvg} alt="" /></Link>
          </div> : <Porfile data={user} />
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
