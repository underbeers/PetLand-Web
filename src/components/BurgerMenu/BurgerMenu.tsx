import React from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import UserService from '../../services/userService';
import {useChatContext} from '../../contexts/chatContext';
import {useUserContext} from '../../contexts/userContext';

import Icons from '../UIKit/Icons';

import Modal from '../Modal/Modal';
import Authorization from '../Authorization/Authorization';

import styles from './BurgerMenu.module.css';


const BurgerMenu: React.FC<{ openedBurger: boolean, toggleBurger: () => void }> = ({openedBurger, toggleBurger}) => {
    const {user, setUser} = useUserContext();
    const {socket} = useChatContext();

    return (
        <>
            <div className={cn(styles.overlay, openedBurger && styles.overlay__opened)} onClick={toggleBurger}></div>
            <div className={cn(styles.burger, openedBurger && styles.burger__opened)}>
                <div className={styles.header__burger}>
                    {!user.empty ?
                        <NavLink to={'/profile'} onClick={toggleBurger} className={styles.content__header__burger}>
                            <img src={user.photo} className={styles.image__header__burger}/>
                            <h3 className={styles.title__header__burger}>{user.firstName}&nbsp;{user.surName}&nbsp;</h3>
                        </NavLink>
                        :
                        <Modal
                            button={
                                <div className={styles.content__header__burger}>
                                    <Icons icon={'account'} className={styles.icon__header__burger}/>
                                    <h3 className={cn('underlined', styles.title__header__burger)}>Войти</h3>
                                </div>
                            }
                            content={Authorization}/>
                    }
                </div>
                <nav className={styles.burger__items}>
                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/adverts'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'adverts'} className={styles.icon}/>
                            Доска объявлений
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/specialists'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'doctor'} className={styles.icon}/>
                            Специалисты
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/organizations'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'hospital'} className={styles.icon}/>
                            Клиники и гостиницы
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/events'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'calendar-multiple'} className={styles.icon}/>
                            Мероприятия
                        </NavLink>
                    </div>
                    <span className={styles.divider}></span>

                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/new-ad'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'ad'} className={styles.icon}/>
                            Разместить объявление
                        </NavLink>
                    </div>
                    <span className={styles.divider}></span>
                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/profile/notifications'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'bell'} className={styles.icon}/>
                            Уведомления
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/profile/favorites'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'cards-heart'} className={styles.icon}/>
                            Избранное
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/messenger'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'chat'} className={styles.icon}/>
                            Сообщения
                        </NavLink>
                    </div>
                    <span className={styles.divider}></span>
                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/profile'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'account'} className={styles.icon}/>
                            Профиль
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/profile/settings'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'settings'} className={styles.icon}/>
                            Настройки
                        </NavLink>
                        {!user.empty &&
                            <a onClick={() => {
                                toggleBurger();
                                UserService.signOut(setUser, socket);
                            }} className={cn('primary__text', styles.burger__item)}>
                                <Icons icon={'sign-out'} className={styles.icon}/>
                                Выход
                            </a>}
                    </div>
                </nav>
            </div>
        </>
    );
};

export default BurgerMenu;
