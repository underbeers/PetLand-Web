import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import Modal from '../Modal/Modal';
import AuthDesktop from '../Authorization/AuthDesktop';

import logo from './img/logo.svg';
import favorite from './img/favorite.svg';
import notification from './img/notification.svg';
import message from './img/message.svg';
import userIcon from './img/user.svg';

import user_profile from '../../static/profile_photo_placeholder.svg';
import m_ads from './img/m_ads.svg';
import m_specialists from './img/m_specialists.svg';
import m_clinics from './img/m_clinics.svg';
import m_events from './img/m_events.svg';
import m_new_ad from './img/m_new_ad.svg';
import m_notifications from './img/m_notifications.svg';
import m_favorites from './img/m_favorites.svg';
import m_messages from './img/m_messages.svg';
import m_profile from './img/m_profile.svg';
import m_settings from './img/m_settings.svg';
import m_sign_out from './img/m_sign_out.svg';

import styles from './Header.module.css';


const Header: React.FC = () => {
    const [servicesDropdown, setServicesDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [mobileMenuStatus, setMobileMenuStatus] = useState(styles.closed);
    const toggleMobileMenu = () => {
        if (mobileMenuStatus === styles.opened) {
            setMobileMenuStatus(styles.closed);
        } else {
            setMobileMenuStatus(styles.opened);
        }
    };

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    if (!isMobile) {
        return (
            <header className={styles.header}>
                <ul className={'container'}>
                    <li>
                        <NavLink to={'/'}><img src={logo} alt={'лого'}/></NavLink>
                    </li>
                    <li className={styles.nav}>
                        <NavLink to={'/bulletin_board'}><h2>Доска объявлений</h2></NavLink>
                        <NavLink
                            onMouseEnter={() => {setServicesDropdown(true)}}
                            onMouseLeave={() => {setServicesDropdown(false)}}
                            className={styles.services__btn}
                            to={'/services'}>
                            <h2>Сервисы</h2>
                        </NavLink>
                        {servicesDropdown && <ul
                            className={styles.services}
                            onMouseEnter={() => {setServicesDropdown(true)}}
                            onMouseLeave={() => {setServicesDropdown(false)}}>
                            <li><NavLink to={'/services/specialists'}>Специалиты</NavLink></li>
                            <li><NavLink to={'/services/clinics'}>Клиники и гостиницы</NavLink></li>
                            <li><NavLink to={'/services/events'}>Мероприятия</NavLink></li>
                        </ul>}
                    </li>
                    <li className={styles.icons}>
                        <NavLink to={'/profile/favorite'}><img src={favorite} alt={'избранное'}/></NavLink>
                        <NavLink to={'/profile/notifications'}><img src={notification} alt={'уведомления'}/></NavLink>
                        <NavLink to={'/profile/messages'}><img src={message} alt={'сообщения'}/></NavLink>
                    </li>
                    <li className={styles.user}>
                        <Modal
                            button={
                                <>
                                    <h2>Войти</h2>
                                    <img className={styles.sign__in} src={userIcon} alt={'Войти'}/>
                                </>
                            }
                            content={AuthDesktop}
                        />
                    </li>
                </ul>
            </header>
        );
    } else {
        return (
            <>
                <div className={cn(styles.wrapper__mobile, mobileMenuStatus)} onClick={toggleMobileMenu}></div>
                <header className={styles.header__mobile}>
                    <span className={styles.burger} onClick={toggleMobileMenu}></span>
                    <NavLink to={'/'}><img src={logo} alt={'лого'}/></NavLink>
                </header>
                <nav className={cn(styles.menu__mobile, mobileMenuStatus)}>
                    <div className={styles.user__mobile}>
                        <a href={'#'}>
                            <img className={styles.sign__in} src={user_profile} alt={'Войти'}/>
                            <h1 className={'link'}>Войти</h1>
                        </a>
                    </div>
                    <ul className={styles.nav__mobile}>
                        <li><NavLink onClick={toggleMobileMenu} to={'/bulletin_board'}>
                            <div>
                                <img src={m_ads} alt={'Доска объявлений'}/>
                            </div>
                            <h2>Доска объявлений</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/services/specialists'}>
                            <div>
                                <img src={m_specialists} alt={'Специалисты'}/>
                            </div>
                            <h2>Специалисты</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/services/clinics'}>
                            <div>
                                <img src={m_clinics} alt={'Клиники и отели'}/>
                            </div>
                            <h2>Клиники и отели</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/services/events'}>
                            <div>
                                <img src={m_events} alt={'Мероприятия'}/>
                            </div>
                            <h2>Мероприятия</h2>
                        </NavLink></li>
                        <span></span>
                        <li><NavLink onClick={toggleMobileMenu} to={'/new_ad'}>
                            <div>
                                <img src={m_new_ad} alt={'Разместить объявление'}/>
                            </div>
                            <h2>Разместить объявление</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/become_specialist'}>
                            <div>
                                <img src={m_new_ad} alt={'Стать специалистом'}/>
                            </div>
                            <h2>Стать специалистом</h2>
                        </NavLink></li>
                        <span></span>
                        <li><NavLink onClick={toggleMobileMenu} to={'/profile/notifications'}>
                            <div>
                                <img src={m_notifications} alt={'Уведомления'}/>
                            </div>
                            <h2>Уведомления</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/profile/favorite'}>
                            <div>
                                <img src={m_favorites} alt={'Избранное'}/>
                            </div>
                            <h2>Избранное</h2>
                        </NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/profile/messages'}>
                            <div>
                                <img src={m_messages} alt={'Сообщения'}/>
                            </div>
                            <h2>Сообщения</h2>
                        </NavLink></li>
                        <span></span>
                        <li><NavLink onClick={toggleMobileMenu} to={'/profile'}>
                            <div>
                                <img src={m_profile} alt={'Профиль'}/>
                            </div>
                            <h2>Профиль</h2></NavLink></li>
                        <li><NavLink onClick={toggleMobileMenu} to={'/profile/settings'}>
                            <div>
                                <img src={m_settings} alt={'Настройки'}/>
                            </div>
                            <h2>Настройки</h2>
                        </NavLink></li>
                        {/*<li><NavLink onClick={toggleMobileMenu} to={'/exit'}><div><img src={m_sign_out}
                         alt={'Выход'}/></div><h2>Выход</h2></NavLink></li>*/}
                    </ul>
                </nav>
            </>
        );
    }
};

export default Header;
