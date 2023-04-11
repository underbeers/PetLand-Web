import React, {useContext, useEffect, useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import userService from '../../services/userService';
import {UserContext} from '../../userContext';

import Icons from '../UIKit/Icons';

import Modal from '../Modal/Modal';
import Authorization from '../Authorization/Authorization';

import styles from './BurgerMenu.module.css';


const BurgerMenu: React.FC<{ openedBurger: boolean, toggleBurger: () => void }> = ({openedBurger, toggleBurger}) => {
    const {user, setUser} = useContext(UserContext);

    return (
        <>
            <div className={cn(styles.overlay, openedBurger && styles.overlay__opened)} onClick={toggleBurger}></div>
            <div className={cn(styles.burger, openedBurger && styles.burger__opened)}>
                <div className={styles.header__burger}>
                    {!user.empty ?
                        <NavLink to={'/profile'} onClick={toggleBurger} className={styles.content__header__burger}>
                            <Icons icon={'account-circle'} className={styles.icon__header__burger}/>
                            <h3 className={styles.title__header__burger}>{user.firstName}&nbsp;{user.surName}&nbsp;</h3>
                        </NavLink> :
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
                        <NavLink onClick={toggleBurger} to={'/bulletin-board'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'bulletin-board'} className={styles.icon}/>
                            Доска объявлений
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/specialists'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'doctor'} className={styles.icon}/>
                            Специалисты
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/clinics'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'hospital'} className={styles.icon}/>
                            Клиники и отели
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/services/events'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'calendar-multiple'} className={styles.icon}/>
                            Мероприятия
                        </NavLink>
                    </div>

                    <span className={styles.divider}></span>

                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/new_ad'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'ad'} className={styles.icon}/>
                            Разместить объявление
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/become_specialist'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'plus-circle-outline'} className={styles.icon}/>
                            Стать специалистом
                        </NavLink>
                    </div>

                    <span className={styles.divider}></span>

                    <div className={styles.block}>
                        <NavLink onClick={toggleBurger} to={'/profile/notifications'}
                                 className={cn('primary__text', styles.burger__item)}>
                            <Icons icon={'bell'} className={styles.icon}/>
                            Уведомления
                        </NavLink>
                        <NavLink onClick={toggleBurger} to={'/profile/favorite'}
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
                                userService.signOut(setUser)
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
