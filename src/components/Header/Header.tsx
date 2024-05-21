import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import singSvg from '../../assets/sign.svg'
import registerSvg from '../../assets/register.svg'
import './Header.scss';

const Header: FC = () => {


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

          <div className="nav__links">
            <Link to="/login" className="button-blue button-blue--big"><img className="header__link-img" src={singSvg} alt="" /></Link>
            <Link to="/register" className="button-blue button-blue--big" ><img className="header__link-img" src={registerSvg} alt="" /></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
