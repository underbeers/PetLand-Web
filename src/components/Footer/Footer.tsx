import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import styles from './Footer.module.css';
import {useIsMobileContext} from "../../contexts/isMobileContext";


const Footer: React.FC = () => {
    const isMobile = useIsMobileContext();

    const year = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            {!isMobile ?
                <div className={styles.row}>
                    <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                    <NavLink to={'/services/specialists'}>Специалисты</NavLink>
                    <NavLink to={'/services/organizations'}>Клиники и гостиницы</NavLink>
                    <NavLink to={'/services/events'}>Мероприятия</NavLink>
                    <NavLink to={'#'}>Мобильное приложение</NavLink>
                </div> :
                <div className={styles.row}>
                    <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                    <NavLink to={'/services'}>Сервисы</NavLink>
                    <NavLink to={'#'}>Приложение</NavLink>
                </div>
            }
            <div className={styles.divider}></div>
            <div className={styles.row}>
                {!isMobile && <p>PetLand - сервис для владельцев питомцев.</p>}
                <p>“PetLand” 2022-{year}</p>
                <NavLink to={'/policy'}>Политика обработки данных</NavLink>
            </div>
        </footer>
    );
}

export default Footer;
