import React from 'react'
import {NavLink} from 'react-router-dom';

import Icons from '../UIKit/Icons';

import styles from './TapBarProfile.module.css';


interface iTapBarProps {
    format: 'profile' | 'circle';
}


const TapBarProfile: React.FC<iTapBarProps> = ({format}) => {

    return (
        <div className={styles.nav}>
            <NavLink to={'/profile/pets'} className={styles.menu__item}>
                <Icons icon={'paw'} className={styles.icon}/>
                <span className={'secondary__text-3'}>Питомцы</span>
            </NavLink>

            <NavLink to={'/profile/favorites'} className={styles.menu__item}>
                <Icons icon={'cards-heart'} className={styles.icon}/>
                <span className={'secondary__text-3'}>Избранное</span>
            </NavLink>

            <NavLink to={'/profile/ads'} className={styles.menu__item}>
                <Icons icon={'ad'} className={styles.icon}/>
                <span className={'secondary__text-3'}>Объявления</span>
            </NavLink>

            <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                <Icons icon={'reviews'} className={styles.icon}/>
                <span className={'secondary__text-3'}>Отзывы</span>
            </NavLink>

            <NavLink to={'/profile/rates'} className={styles.menu__item}>
                <Icons icon={'round-star'} className={styles.icon}/>
                <span className={'secondary__text-3'}>Рейтинг</span>
            </NavLink>

        </div>
    );
};

export default TapBarProfile;
