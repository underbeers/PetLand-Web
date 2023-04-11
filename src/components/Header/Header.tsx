import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';

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

    const {user, setUser} = useContext(UserContext);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 760)
    });

    return (
        !isMobile ?
            <header className={styles.header}>
                <ul className={'container'}>
                    <li>
                        <NavLink to={'/'} className={styles.logo}>PetLand</NavLink>
                    </li>
                    <li className={styles.nav}>
                        <NavLink to={'/bulletin-board'}>Доска объявлений</NavLink>
                        <NavLink onMouseEnter={() => {
                            setServicesDropdown(true)
                        }} onMouseLeave={() => {
                            setServicesDropdown(false)
                        }} className={styles.services__btn}
                                 to={'/services'}>
                            Сервисы
                        </NavLink>
                        {servicesDropdown && <ul
                            className={styles.services}
                            onMouseEnter={() => {
                                setServicesDropdown(true)
                            }}
                            onMouseLeave={() => {
                                setServicesDropdown(false)
                            }}>
                            <li><NavLink to={'/services/specialists'}>Специалиты</NavLink></li>
                            <li><NavLink to={'/services/clinics'}>Клиники и гостиницы</NavLink></li>
                            <li><NavLink to={'/services/events'}>Мероприятия</NavLink></li>
                        </ul>}
                    </li>
                    <li className={styles.icons}>
                        <NavLink to={'/profile/favorite'}><Icons icon={'cards-heart'}/></NavLink>
                        <NavLink to={'/profile/notifications'}><Icons icon={'bell'}/></NavLink>
                        <NavLink to={'/messenger'}><Icons icon={'chat'}/></NavLink>
                    </li>
                    <li className={styles.user}>
                        {!user.empty || user.loading ?
                            <>
                                <NavLink
                                    to={'/profile'}
                                    onMouseEnter={() => {
                                        setProfileDropdown(true)
                                    }}
                                    onMouseLeave={() => {
                                        setProfileDropdown(false)
                                    }}>
                                    {user.loading ?
                                        <>
                                            <div className={'loading'}
                                                 style={{width: 100, height: '1.5em', borderRadius: 5}}></div>
                                            <div className={'loading'}
                                                 style={{width: 40, height: 40, borderRadius: 20}}></div>
                                        </> :
                                        <>
                                            <h5>{user.firstName}&nbsp;{user.surName}&nbsp;</h5>
                                            <img src={user.photo} alt={`${user.firstName} ${user.surName}`}
                                                 title={'Профиль'}/>
                                        </>}
                                </NavLink>
                                {profileDropdown && <ul
                                    className={styles.services}
                                    style={{left: -20, width: 160, cursor: 'initial'}}
                                    onMouseEnter={() => {
                                        setProfileDropdown(true)
                                    }}
                                    onMouseLeave={() => {
                                        setProfileDropdown(false)
                                    }}>
                                    <li><NavLink to={'/profile/pets'}>Питомцы</NavLink></li>
                                    <li><NavLink to={'/profile/favorite'}>Избранное</NavLink></li>
                                    <li><NavLink to={'/profile/ads'}>Объявления</NavLink></li>
                                    <li><NavLink to={'/profile/reviews'}>Отзывы</NavLink></li>
                                    <li><NavLink to={'/profile/rates'}>Рейтинг</NavLink></li>
                                    <li><span className={styles.divider}></span></li>
                                    <li><a onClick={() => userService.signOut(setUser)}>Выход</a></li>
                                </ul>}
                            </> :
                            <Modal
                                button={
                                    <>
                                        <h5>Войти</h5>
                                        <Icons icon={'account'}/>
                                    </>
                                }
                                content={Authorization}/>
                        }
                    </li>
                </ul>
            </header> : <></>
    );
};

export default Header;
