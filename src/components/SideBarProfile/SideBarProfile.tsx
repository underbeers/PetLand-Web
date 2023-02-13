import React, {useContext, useState} from 'react';
import {UserContext} from "../../userContext";
import {NavLink} from "react-router-dom";

import Image from "../Image/Image";

import paw from '../../static/icons/paw.svg';
import favorite from '../../static/icons/favorite.svg';
import ads from '../../static/icons/ad.svg';
import reviews from '../../static/icons/reviews.svg';
import star from '../../static/icons/star.svg';
import settings from '../../static/icons/settings.svg';
import signOut from '../../static/icons/sign-out.svg';
import userPhoto from "./img/user.jpg"

import styles from './SideBarProfile.module.css'


const SideBarProfile = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <div className={styles.content}>
            <div className={styles.photo}>
                <Image
                    imageProps={{src: userPhoto, alt: 'Фото', width: '172px', height: '172px'}}
                    borderRadius={'100px 100px 100px 100px'}
                    className={styles.image}/>
            </div>

            <h1 className={styles.name}>{user.firstName}&nbsp;{user.surName}</h1>
            <div className={styles.divider}></div>

            <ul className={styles.menu}>
                <li className={styles.nav}>
                    <NavLink to={'/profile/pets'} className={styles.menu__item}>
                        <img src={paw} alt="Питомцы"/>
                        <h2>Питомцы</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/favorite'} className={styles.menu__item}>
                        <img src={favorite} alt="Избранное"></img>
                        <h2>Избранное</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/ads'} className={styles.menu__item}>
                        <img src={ads} alt="Объявления"></img>
                        <h2>Объявления</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                        <img src={reviews} alt="Отзывы"></img>
                        <h2>Отзывы</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/rates'} className={styles.menu__item}>
                        <img src={star} alt="Рейтинг"></img>
                        <h2>Рейтинг</h2>
                    </NavLink>
                </li>
            </ul>

            <div className={styles.divider}></div>

            <ul className={styles.settings__quit}>
                <li className={styles.nav}>
                    <NavLink to={'/profile/settings'} className={styles.menu__item}>
                        <img src={settings} alt="Настройки"></img>
                        <h2>Настройки</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/'} className={styles.menu__item}>
                        <img src={signOut} alt="Выход"></img>
                        <h2>Выход</h2>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBarProfile;
