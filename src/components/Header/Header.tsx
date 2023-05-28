import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {useUserContext} from '../../contexts/userContext';
import {useChatContext} from '../../contexts/chatContext';
import {useIsMobileContext} from '../../contexts/isMobileContext';
import userService from '../../services/userService';

import Icons from '../UIKit/Icons';

import Modal from '../Modal/Modal';
import Authorization from '../Authorization/Authorization';

import styles from './Header.module.css';


const Header: React.FC = () => {
    const [servicesDropdown, setServicesDropdown] = useState(false);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const {user, setUser} = useUserContext();
    const {socket} = useChatContext();
    const isMobile = useIsMobileContext();

    if (isMobile) {
        return <></>;
    }

    return <header className={styles.header}>
        <ul className={'container'}>
            <li>
                <NavLink to={'/'} className={styles.logo}>PetLand</NavLink>
            </li>
            <li className={styles.nav}>
                <NavLink to={'/adverts'}>Доска объявлений</NavLink>
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
                    <li><NavLink to={'/services/specialists'}>Специалисты</NavLink></li>
                    <li><NavLink to={'/services/organizations'}>Клиники и гостиницы</NavLink></li>
                    <li><NavLink to={'/services/events'}>Мероприятия</NavLink></li>
                </ul>}
            </li>
            <li className={styles.icons}>
                <NavLink to={'/profile/favorites'}><Icons icon={'cards-heart'}/></NavLink>
                <NavLink to={'/profile/notifications'}><Icons icon={'bell'}/></NavLink>
                <NavLink to={'/messenger'}><Icons icon={'chat'}/></NavLink>
            </li>
            <li className={styles.user}>
                {!user.empty ?
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
                            <li><NavLink to={'/profile/favorites'}>Избранное</NavLink></li>
                            <li><NavLink to={'/profile/adverts'}>Объявления</NavLink></li>
                            <li><NavLink to={'/profile/reviews'}>Отзывы</NavLink></li>
                            <li><NavLink to={'/profile/rates'}>Рейтинг</NavLink></li>
                            <li><span className={styles.divider}></span></li>
                            <li><a onClick={() => userService.signOut(setUser, socket)}>Выход</a></li>
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
    </header>;
};

export default Header;
