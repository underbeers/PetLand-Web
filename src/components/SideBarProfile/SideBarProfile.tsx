import React from 'react';
import {NavLink} from 'react-router-dom';

import {useUserContext} from '../../contexts/userContext';
import {useChatContext} from '../../contexts/chatContext';
import userService from '../../services/userService';

import Image from '../Image/Image';
import Icons from '../UIKit/Icons';

import styles from './SideBarProfile.module.css'
import UserService from "../../services/userService";


const SideBarProfile = () => {
    const {user, setUser} = useUserContext();
    const {socket} = useChatContext();
    return (
        <div>
            <div className={styles.content}>
                <input type={"file"} id={styles.user_photo} accept={"image/png, image/jpeg"} onChange={(e) => {
                    console.log(e);
                    const fileInput = document.querySelector(`#${styles.user_photo}`);
                    if (!fileInput) {
                        console.log(styles.user_photo)
                        return;
                    }
                    const formData = new FormData();
                    // @ts-ignore
                    formData.append('file', fileInput.files[0]);
                    // @ts-ignore
                    console.log(formData.get('file'))
                    // @ts-ignore
                    UserService.updateAvatar(formData, user.accessToken).then(response => {
                        console.log(response);
                        return response.json();
                    }).then(body => {
                        console.log(body);
                    });
                }}/>
                <Image
                    imageProps={{src: user.photo, alt: 'Фото', width: '172px', height: '172px'}}
                    borderRadius={'86px'}/>
                <h4>{user.firstName} {user.surName}</h4>

                <div className={styles.divider}></div>

                <NavLink to={'/profile/pets'} className={styles.menu__item}>
                    <Icons icon={'paw'}/>
                    <p>Питомцы</p>
                </NavLink>
                <NavLink to={'/profile/favorites'} className={styles.menu__item}>
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
