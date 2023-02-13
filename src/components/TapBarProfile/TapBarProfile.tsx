import React from 'react'
import {NavLink} from 'react-router-dom';

import paw from '../../static/icons/paw.svg';
import favorite from '../../static/icons/favorite.svg';
import ads from '../../static/icons/ad.svg';
import reviews from '../../static/icons/reviews.svg';
import star from '../../static/icons/star.svg';

import styles from './TapBarProfile.module.css';


const TapBarProfile = () => {

    return (
        <div className={styles.nav}>
            <NavLink to={'/profile/pets'} className={styles.menu__item}>
                <img src={paw} alt='pets' className={styles.icon}/>
                <span className={styles.text}>Питомцы</span>
            </NavLink>


            <NavLink to={'/profile/favorite'} className={styles.menu__item}>
                <img src={favorite} alt='favorite' className={styles.icon}/>
                <span className={styles.text}>Избранное</span>
            </NavLink>


            <NavLink to={'/profile/ads'} className={styles.menu__item}>
                <img src={ads} alt='ads' className={styles.icon}/>
                <span className={styles.text}>Объявления</span>
            </NavLink>


            <NavLink to={'/profile/reviews'} className={styles.menu__item}>
                <img src={reviews} alt='reviews' className={styles.icon}/>
                <span className={styles.text}>Отзывы</span>
            </NavLink>


            <NavLink to={'/profile/rates'} className={styles.menu__item}>
                <img src={star} alt='star' className={styles.icon}/>
                <span className={styles.text}>Рейтинг</span>
            </NavLink>

            <div className={styles.indicator}></div>
        </div>
    )
}

export default TapBarProfile;
