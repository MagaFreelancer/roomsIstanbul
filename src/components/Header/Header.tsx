import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import singSvg from '../../assets/sign.svg'
import registerSvg from '../../assets/register.svg'

import './Header.scss';

const items: string[] = [
  'Home', 'About', 'Service', 'New Property', 'Contact'
]
const Header: FC = () => {

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <Link to="/">
            <img src={logoSvg} alt="" />
          </Link>
          <ul className="header__menu">
            {items.map((item, index) => (<li key={index} className="header__item"><NavLink to={`/${item}`}>{item}</NavLink></li>))}
          </ul>
          <div className="nav__btns">
          <Link className="button-blue button--big" to="/login"><img className="header__btn-img" src={singSvg} alt="" /></Link>
          <Link className="button-blue button--big" to="/register"><img className="header__btn-img" src={registerSvg} alt="" /></Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
