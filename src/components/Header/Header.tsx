import { FC } from "react";
import { Link, NavLink } from "react-router-dom";
import logoSvg from "../../assets/logo.svg";
import singSvg from '../../assets/sign.svg'
import registerSvg from '../../assets/register.svg'
import { useSelector } from 'react-redux';
import { selectAuth } from '../../redux/slices/authSlice';
import Porfile from "./Profile/Profile";
import { logout, selectAuthData } from "../../redux/slices/authSlice";
import './Header.scss';

const items: string[] = [
  'Home', 'About', 'Service', 'New Property', 'Contact'
]
const Header: FC = () => {
  const isAuth = useSelector(selectAuth);
  const data = useSelector(selectAuthData);
  console.log(logout());
  
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

          {isAuth === false ? <div className="nav__btns">
            <Link to="/login" className="button-blue button--big"><img className="header__btn-img" src={singSvg} alt="" /></Link>
            <Link to="/register" className="button-blue button--big" ><img className="header__btn-img" src={registerSvg} alt="" /></Link>
          </div> : <Porfile logout={logout} data={data!} />
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
