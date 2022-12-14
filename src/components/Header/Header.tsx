import React, {useEffect, useRef, useState} from "react";
import {NavLink} from "react-router-dom";

import logo from './img/PetLand.svg';
import favorite from './img/Favorite.svg';
import notification from './img/Notification.svg';
import message from './img/Message.svg';
import userIcon from './img/User.svg';

import styles from './Header.module.css';

const Header: React.FC = () => {

    const [servicesDropdown, setServicesDropdown] = useState(false);

    return (
        <header className={styles.header}>
            <ul className={"container"}>
                <li>
                    <NavLink to={'/'}><img src={logo} alt={"лого"}/></NavLink>
                </li>
                <li className={styles.nav}>
                    <NavLink to={"bulletin_board"}><h2>Доска объявлений</h2></NavLink>
                    <NavLink
                        onMouseEnter={() => {setServicesDropdown(true)}}
                        onMouseLeave={() => {setServicesDropdown(false)}}
                        className={styles.services__btn}
                        to={"services"}><h2>Сервисы</h2></NavLink>
                    {servicesDropdown && <ul
                        className={styles.services}
                        onMouseEnter={() => {setServicesDropdown(true)}}
                        onMouseLeave={() => {setServicesDropdown(false)}}
                    >
                        <li><NavLink to={"services/specialists"}>Специалиты</NavLink></li>
                        <li><NavLink to={"services/clinics"}>Клиники и гостиницы</NavLink></li>
                        <li><NavLink to={"services/events"}>Мероприятия</NavLink></li>
                    </ul>}
                </li>
                <li className={styles.icons}>
                    <NavLink to={"/profile/favorite"}><img src={favorite} alt={"избранное"}/></NavLink>
                    <NavLink to={"/profile/notifications"}><img src={notification} alt={"уведомления"}/></NavLink>
                    <NavLink to={"/profile/messages"}><img src={message} alt={"сообщения"}/></NavLink>
                </li>
                <li className={styles.user}>
                    <NavLink to={"/profile"}>
                        <h2>Войти</h2>
                        <img className={styles.sign__in} src={userIcon} alt={"Войти"}/>
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};

export default Header;
