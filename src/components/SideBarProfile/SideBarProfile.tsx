import React, {useContext} from 'react';
import {useUserContext} from '../../userContext';
import {NavLink} from 'react-router-dom';

import {useChatContext} from '../../chatContext';
import userService from '../../services/userService';

import Icons from '../UIKit/Icons';
import Image from '../Image/Image';

import styles from './SideBarProfile.module.css'


const SideBarProfile = () => {
    const {user, setUser} = useUserContext();
    const {socket} = useChatContext();
    return (
        <div>
            <div className={styles.content}>
                <Image
                    imageProps={{src: user.photo, alt: 'Фото', width: '172px', height: '172px'}}
                    borderRadius={'86px'}/>
                <h4>{user.firstName} {user.surName}</h4>

                <div className={styles.divider}></div>

                <NavLink to={'/profile/pets'} className={styles.menu__item}>
                    <Icons icon={'paw'}/>
                    <p>Питомцы</p>
                </NavLink>
                <NavLink to={'/profile/favorite'} className={styles.menu__item}>
                    <Icons icon={'cards-heart'}/>
                    <p>Избранное</p>
                </NavLink>
                <NavLink to={'/profile/ads'} className={styles.menu__item}>
                    <Icons icon={'ad'}/>
                    <p>Объявления</p>
                </NavLink>
                <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                    <Icons icon={'reviews'}/>
                    <p>Отзывы</p>
                </NavLink>
                <NavLink to={'/profile/rates'} className={styles.menu__item}>
                    <Icons icon={'round-star'}/>
                    <p>Рейтинг</p>
                </NavLink>

                <div className={styles.divider}></div>

                <NavLink to={'/profile/settings'} className={styles.menu__item}>
                    <Icons icon={'settings'}/>
                    <p>Настройки</p>
                </NavLink>
                <a className={styles.menu__item} onClick={() => userService.signOut(setUser, socket)}>
                    <Icons icon={'sign-out'}/>
                    <p>Выход</p>
                </a>
            </div>
        </div>
    );
};

export default SideBarProfile;
