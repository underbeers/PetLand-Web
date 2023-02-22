import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {UserContext} from '../../userContext';
import userService from '../../services/userService';

import Modal from '../Modal/Modal';
import Authorization from '../Authorization/Authorization';

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
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [mobileMenuStatus, setMobileMenuStatus] = useState(styles.closed);


    const {user, setUser} = useContext(UserContext);

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

    return (!isMobile ?
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
                        <NavLink to={'/profile/favorite'}><img src={favorite} alt={'Избранное'} title={'Избранное'}/></NavLink>
                        <NavLink to={'/profile/notifications'}><img src={notification} alt={'Уведомления'} title={'Уведомления'}/></NavLink>
                        <NavLink to={'/profile/messages'}><img src={message} alt={'Сообщения'} title={'Сообщения'}/></NavLink>
                    </li>
                    <li className={styles.user}>
                        {!user.empty || user.loading ?
                            <>
                                <NavLink
                                    to={'/profile'}
                                    onMouseEnter={() => {setProfileDropdown(true)}}
                                    onMouseLeave={() => {setProfileDropdown(false)}}>
                                    {user.loading ?
                                        <>
                                            <div className={'loading'} style={{width: 100, height: '1.5em', borderRadius: 5}}></div>
                                            <div className={'loading'} style={{width: 40, height: 40, borderRadius: 20}}></div>
                                        </>:
                                        <>
                                            <h2>{user.firstName}&nbsp;{user.surName}&nbsp;</h2>
                                            <img src={user.photo} alt={`${user.firstName} ${user.surName}`} title={'Профиль'}/>
                                        </>}
                                </NavLink>
                                {profileDropdown && <ul
                                    className={styles.services}
                                    style={{left: -20, width: 160, cursor: 'initial'}}
                                    onMouseEnter={() => {setProfileDropdown(true)}}
                                    onMouseLeave={() => {setProfileDropdown(false)}}>
                                    <li><NavLink to={'/profile/favorite'}>Избранное</NavLink></li>
                                    <li><NavLink to={'/profile/pets'}>Мои питомцы</NavLink></li>
                                    <li><NavLink to={'/profile/ads'}>Мои объявления</NavLink></li>
                                    <li><NavLink to={'/profile/reviews'}>Мои отзывы</NavLink></li>
                                    <li><NavLink to={'/profile/rates'}>Мой рейтинг</NavLink></li>
                                    <li><span className={styles.divider}></span></li>
                                    <li><a onClick={()=>userService.signOut(setUser)}>Выход</a></li>
                                </ul>}
                            </>:
                            <Modal
                                button={
                                    <>
                                        <h2>Войти</h2>
                                        <img className={styles.sign__in} src={userIcon} alt={'Войти'}/>
                                    </>
                                }
                                content={Authorization}
                                contentProps={{isMobile}}
                            />
                        }
                    </li>
                </ul>
            </header> :
            <>
                <div className={cn(styles.wrapper__mobile, mobileMenuStatus)} onClick={toggleMobileMenu}></div>
                <header className={styles.header__mobile}>
                    <span className={styles.burger} onClick={toggleMobileMenu}></span>
                    <NavLink to={'/'}><img src={logo} alt={'лого'}/></NavLink>
                </header>
                <nav className={cn(styles.menu__mobile, mobileMenuStatus)}>
                    <div className={styles.user__mobile}>
                        {!user.empty ?
                            <NavLink to={'/profile'} onClick={toggleMobileMenu}>
                                <img src={user_profile} className={styles.sign__in}
                                     title={'Выйти'}
                                     alt={'Выйти'}/>
                                <h1>{user.firstName}&nbsp;{user.surName}&nbsp;</h1>
                            </NavLink> :
                            <Modal
                                button={
                                    <>
                                        <img className={styles.sign__in} src={user_profile} alt={'Войти'}/>
                                        <h1 className={'link'}>Войти</h1>
                                    </>
                                }
                                content={Authorization}
                                contentProps={{isMobile}}/>
                        }
                    </div>
                    <ul className={styles.nav__mobile}>
                        <div>
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
                        </div>
                        <span></span>
                        <div>
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
                        </div>
                        <span></span>
                        <div>
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
                        </div>
                        <span></span>
                        <div>
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
                            {!user.empty &&
                                <li><a onClick={()=>{toggleMobileMenu();userService.signOut(setUser)}}>
                                    <div>
                                        <img src={m_sign_out} alt={'Выход'}/>
                                    </div>
                                    <h2>Выход</h2>
                                </a></li>}
                        </div>
                    </ul>
                </nav>

            </>
    );
};

export default Header;
