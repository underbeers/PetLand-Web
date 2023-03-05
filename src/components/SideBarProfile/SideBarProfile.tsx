import React, {useContext, useState} from 'react';
import {UserContext} from "../../userContext";
import {NavLink} from "react-router-dom";

import Image from "../Image/Image";

import styles from './SideBarProfile.module.css'
import Icons from "../UIKit/Icons";


const SideBarProfile = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <div className={styles.content}>
            <div className={styles.photo}>
                {user.loading ?
                    <>
                        <div className={'loading'} style={{width: 172, height: 172, borderRadius: 86}}/>
                    </> :
                    <>
                        <Image
                            imageProps={{src: user.photo, alt: 'Фото', width: '172px', height: '172px'}}
                            borderRadius={'86px'}
                            className={styles.image}/>
                    </>
                }
            </div>
            {user.loading ?
                <>
                    <div className={'loading'} style={{width: 85, height: '1.5em', borderRadius: 5}}/>
                    <div className={'loading'} style={{width: 75, height: '1.5em', borderRadius: 5}}/>
                </>:
                <>
                    <h1 className={styles.name}>{user.firstName} {user.surName}</h1>
                </>
            }

            <div className={styles.divider}></div>

            <ul className={styles.menu}>
                <li className={styles.nav}>
                    <NavLink to={'/profile/pets'} className={styles.menu__item}>
                        <Icons icon={"paw"}/>
                        <h2>Питомцы</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/favorite'} className={styles.menu__item}>
                        <Icons icon={"cards-heart"}/>
                        <h2>Избранное</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/ads'} className={styles.menu__item}>
                        <Icons icon={"ad"}/>
                        <h2>Объявления</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                        <Icons icon={"reviews"}/>
                        <h2>Отзывы</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/profile/rates'} className={styles.menu__item}>
                        <Icons icon={"round-star"}/>
                        <h2>Рейтинг</h2>
                    </NavLink>
                </li>
            </ul>

            <div className={styles.divider}></div>

            <ul className={styles.settings__quit}>
                <li className={styles.nav}>
                    <NavLink to={'/profile/settings'} className={styles.menu__item}>
                        <Icons icon={"settings"}/>
                        <h2>Настройки</h2>
                    </NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={'/'} className={styles.menu__item}>
                        <Icons icon={"sign-out"}/>
                        <h2>Выход</h2>
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}

export default SideBarProfile;
