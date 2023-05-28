import React from 'react';
import {NavLink} from 'react-router-dom';

import {useIsMobileContext} from '../../contexts/isMobileContext';

import styles from './EventCard.module.css';


interface iEventProps {
    id: string,
    name: string,
    description: string,
    city: number,
    place: string,
    date: string,
    price: string,
    phone: string,
    photo: string
}

const EventCard: React.FC<iEventProps> = ({id, name, description, city, place, date, price, phone, photo}) => {
    const isMobile = useIsMobileContext();

    return (
        <NavLink to={`/services/events/event?id=${id}`} className={styles.card}>
            <img className={styles.photo}
                 src={photo}
                 alt={'Фото мероприятия'}/>
            <div className={styles.eventInfo}>
                <div className={styles.name}>
                    <h5>{name}</h5>
                </div>

                {!isMobile ? <div className={styles.place}>
                        <p>Место:</p>
                        <p>{place}</p>
                    </div> :
                    <p className={'secondary__text-2'}>{place}</p>
                }

                <div className={styles.date__price}>
                    <p className={styles.date}>{date}</p>
                    <p className={styles.price}>{price}</p>
                </div>
            </div>
        </NavLink>
    )
}
export default EventCard;