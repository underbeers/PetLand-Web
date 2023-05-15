import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import styles from './EventCard.module.css';


const EventCard = () => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <NavLink to={'/services/events/event-page'} className={styles.card}>
            <img className={styles.photo}
                 src={'https://krasivosti.pro/uploads/posts/2022-01/1641407305_56-krasivosti-pro-p-vistavka-koshek-krasivo-foto-57.jpg'}
                 alt={'Фото мероприятия'}/>
            <div className={styles.eventInfo}>
                <div className={styles.name}>
                    <h5>Название мероприятия</h5>
                </div>

                {!isMobile ? <div className={styles.place}>
                    <p>Место:</p>
                    <p>Нижегородская ярмарка</p>
                </div> :
                    <p className={'secondary__text-2'}>Нижегородская ярмарка</p>
                }

                <div className={styles.date__price}>
                    <p>дд.мм.гггг</p>
                    <p>500 ₽</p>
                </div>
            </div>
        </NavLink>
    )
}
export default EventCard;