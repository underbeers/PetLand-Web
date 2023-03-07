import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {UserContext} from '../../userContext';
import userService from '../../services/userService';

import Icons from '../UIKit/Icons';

import Modal from '../Modal/Modal';
import Authorization from '../Authorization/Authorization';

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
                        <NavLink to={'/'} className={styles.logo}>PetLand</NavLink>
                    </li>
                    <li className={styles.nav}>
                        <NavLink to={'/bulletin-board'}>Доска объявлений</NavLink>
                        <NavLink
                            onMouseEnter={() => {setServicesDropdown(true)}}
                            onMouseLeave={() => {setServicesDropdown(false)}}
                            className={styles.services__btn}
                            to={'/services'}>
                            Сервисы
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
                        <NavLink to={'/profile/favorite'}><Icons icon={'cards-heart'}/></NavLink>
                        <NavLink to={'/profile/notifications'}><Icons icon={'bell'}/></NavLink>
                        <NavLink to={'/profile/messages'}><Icons icon={'chat'}/></NavLink>
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
                                            <h5>{user.firstName}&nbsp;{user.surName}&nbsp;</h5>
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
                                        <h5>Войти</h5>
                                        <Icons icon={'account'}/>
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
                    <NavLink to={'/'} className={styles.logo}>PetLand</NavLink>
                </header>
                <nav className={cn(styles.menu__mobile, mobileMenuStatus)}>
                    <div className={styles.user__mobile}>
                        {!user.empty ?
                            <NavLink to={'/profile'} onClick={toggleMobileMenu}>
                                <Icons icon={'sign-out'} className={styles.sign__in}/>
                                <h1>{user.firstName}&nbsp;{user.surName}&nbsp;</h1>
                            </NavLink> :
                            <Modal
                                button={
                                    <>
                                        <Icons icon={'account'} className={styles.sign__in}/>
                                        <h1 className={'link'}>Войти</h1>
                                    </>
                                }
                                content={Authorization}
                                contentProps={{isMobile}}/>
                        }
                    </div>
                    <ul className={styles.nav__mobile}>
                        <div>
                            <li><NavLink onClick={toggleMobileMenu} to={'/bulletin-board'}>
                                <div>
                                    <Icons icon={'ad'}/>
                                </div>
                                <h2>Доска объявлений</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/services/specialists'}>
                                <div>
                                    <Icons icon={'template'}/>
                                </div>
                                <h2>Специалисты</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/services/clinics'}>
                                <div>
                                    <Icons icon={'template'}/>
                                </div>
                                <h2>Клиники и отели</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/services/events'}>
                                <div>
                                    <Icons icon={'template'}/>
                                </div>
                                <h2>Мероприятия</h2>
                            </NavLink></li>
                        </div>
                        <span></span>
                        <div>
                            <li><NavLink onClick={toggleMobileMenu} to={'/new_ad'}>
                                <div>
                                    <Icons icon={'ad'}/>
                                </div>
                                <h2>Разместить объявление</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/become_specialist'}>
                                <div>
                                    <Icons icon={'template'}/>
                                </div>
                                <h2>Стать специалистом</h2>
                            </NavLink></li>
                        </div>
                        <span></span>
                        <div>
                            <li><NavLink onClick={toggleMobileMenu} to={'/profile/notifications'}>
                                <div>
                                    <Icons icon={'chat'}/>
                                </div>
                                <h2>Уведомления</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/profile/favorite'}>
                                <div>
                                    <Icons icon={'cards-heart'}/>
                                </div>
                                <h2>Избранное</h2>
                            </NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/profile/messages'}>
                                <div>
                                    <Icons icon={'chat'}/>
                                </div>
                                <h2>Сообщения</h2>
                            </NavLink></li>
                        </div>
                        <span></span>
                        <div>
                            <li><NavLink onClick={toggleMobileMenu} to={'/profile'}>
                                <div>
                                    <Icons icon={'account'}/>
                                </div>
                                <h2>Профиль</h2></NavLink></li>
                            <li><NavLink onClick={toggleMobileMenu} to={'/profile/settings'}>
                                <div>
                                    <Icons icon={'settings'}/>
                                </div>
                                <h2>Настройки</h2>
                            </NavLink></li>
                            {!user.empty &&
                                <li><a onClick={()=>{toggleMobileMenu();userService.signOut(setUser)}}>
                                    <div>
                                        <Icons icon={'sign-out'}/>
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
