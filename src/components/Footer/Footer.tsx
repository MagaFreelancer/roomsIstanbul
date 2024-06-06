import { Link, NavLink } from 'react-router-dom'
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import TelegramIcon from '@mui/icons-material/Telegram';
import appStore from '../../assets/appstore.png'
import playMarket from '../../assets/playstore.png'

import "./Footer.scss"
const Footer = () => {
    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__top">
                    <div className="footer__col">
                        <h4 className='footer__heading'>Компания</h4>
                        <ul className="footer__menu">
                            <li className="footer__item">
                                <NavLink className='footer__link' to="/">Главаня</NavLink>
                            </li>
                            <li className="footer__item">
                                <NavLink className='footer__link' to="/offices">Офисы</NavLink>
                            </li>
                            <li className="footer__item">
                                <NavLink className='footer__link' to="/about">О нас</NavLink>
                            </li>

                        </ul>
                    </div>
                    <div className="footer__col">
                        <h4 className='footer__heading'>Личный кабинет</h4>
                        <ul className="footer__menu">
                            <li className="footer__item">
                                <Link className='footer__link' to="/">Профиль</Link>
                            </li>
                            <li className="footer__item">
                                <Link className='footer__link' to="/">Настройки</Link>
                            </li>
                            <li className="footer__item">
                                <Link className='footer__link' to="/">Избранное</Link>
                            </li>
                            <li className="footer__item">
                                <Link className='footer__link' to="/">Выйти</Link>
                            </li>
                        </ul>
                    </div>  <div className="footer__col">
                        <h4 className='footer__heading'>Приложения</h4>
                        <ul className="footer__markets">
                            <li className="footer__item">
                                <Link className='footer__markets-link' to="/"><img src={appStore} alt="appstore" /></Link>
                            </li>
                            <li className="footer__item">
                                <Link className='footer__markets-link' to="/"><img src={playMarket} alt="googleplay" /></Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="footer__bottom">
                    <div className="footer__copyright">
                        © Copyright 2022, All Rights Reserved by ClarityUI
                    </div>
                    <ul className="footer__socials">
                        <li className="footer__socials-item">
                            <Link className='footer__socials-link' to="/"><XIcon /></Link>
                        </li>
                        <li className="footer__socials-item">
                            <Link className='footer__socials-link' to="/"><FacebookIcon /></Link>
                        </li>
                        <li className="footer__socials-item">
                            <Link className='footer__socials-link' to="/"><InstagramIcon /></Link>
                        </li>
                        <li className="footer__socials-item">
                            <Link className='footer__socials-link' to="/"><TelegramIcon /></Link>
                        </li>
                    </ul>
                </div>
            </div>

        </footer>
    )
}

export default Footer