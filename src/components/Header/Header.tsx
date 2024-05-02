import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import Button from '../Button/Button.tsx'
import './Header.scss';
import { BtnClasses } from "../Button/Button.tsx";

const items: string[] = [
  'Home', 'About', 'Service', 'New Property', 'Contact'
]
const Header: React.FC = () => {

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
          <Button cls={BtnClasses.BUTTON_BIG}>lol</Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
