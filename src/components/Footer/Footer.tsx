import React, {useState} from 'react';
import {NavLink} from "react-router-dom";

import styles from './Footer.module.css';


const Footer: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <footer className={styles.footer}>
            {!isMobile ?
                <div className={styles.row}>
                    <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                    <NavLink to={'#'}>Специалисты</NavLink>
                    <NavLink to={'#'}>Клиники и отели</NavLink>
                    <NavLink to={'#'}>Мероприятия</NavLink>
                    <NavLink to={'#'}>Мобильное приложение</NavLink>
                </div> :
                <div className={styles.row}>
                    <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                    <NavLink to={'#'}>Сервисы</NavLink>
                    <NavLink to={'#'}>Приложение</NavLink>
                </div>
            }
            <div className={styles.divider}></div>
            <div className={styles.row}>
                {!isMobile && <p>PetLand - сервис для владельцев питомцев.</p>}
                <p>“PetLand” 2022-2023</p>
                <NavLink to={'#'}>Политика обработки данных</NavLink>
            </div>
        </footer>
    );
}

export default Footer;
