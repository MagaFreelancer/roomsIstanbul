import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import { BtnClasses } from "../Button/Button.tsx";
import Button from '../Button/Button.tsx'
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
          <Button cls={BtnClasses.BUTTON_BIG}><img className="header__btn-img" src={singSvg} alt="" /></Button>
          <Button cls={BtnClasses.BUTTON_BIG}><img className="header__btn-img" src={registerSvg} alt="" /></Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
