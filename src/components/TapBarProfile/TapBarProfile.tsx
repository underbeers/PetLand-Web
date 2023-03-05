import React from 'react'
import {NavLink} from 'react-router-dom';

import styles from './TapBarProfile.module.css';
import Icons from '../UIKit/Icons';


interface ITapBarProps {
    format: 'profile' | 'circle';
}


const TapBarProfile: React.FC<ITapBarProps> = ({format}) => {

    return (
            <div className={styles.nav}>
                <NavLink to={'/profile/pets'} className={styles.menu__item}>
                    <Icons icon={'paw'}/>
                    <span className={styles.text}>Питомцы</span>
                </NavLink>


                <NavLink to={'/profile/favorite'} className={styles.menu__item}>
                    <Icons icon={'cards-heart'}/>
                    <span className={styles.text}>Избранное</span>
                </NavLink>


                <NavLink to={'/profile/ads'} className={styles.menu__item}>
                    <Icons icon={'ad'}/>
                    <span className={styles.text}>Объявления</span>
                </NavLink>


                <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                    <Icons icon={'reviews'}/>
                    <span className={styles.text}>Отзывы</span>
                </NavLink>


                <NavLink to={'/profile/rates'} className={styles.menu__item}>
                    <Icons icon={'round-star'}/>
                    <span className={styles.text}>Рейтинг</span>
                </NavLink>


                <div className={styles[format]}></div>
            </div>
    )
}

export default TapBarProfile;
