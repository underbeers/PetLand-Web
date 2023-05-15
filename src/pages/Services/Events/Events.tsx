import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import EventCard from '../../../components/EventCard/EventCard';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './Events.module.css';


const Events = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Мероприятия</h5>
                    <Icons icon={'geo'}/>
                </TopBar>}

            {!isMobile ?
                <div className={styles.title__geo}>
                    <h1>Интересные мероприятия</h1>
                    <div className={styles.geo}>
                        <Icons icon={'geo'}/>
                        <p>Город</p>
                    </div>
                </div> :
                <h3 className={styles.title}>Интересные мероприятия</h3>
            }

            <div className={styles.cards}>
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
                <EventCard />
            </div>

        </>
    )
}

export default Events;
