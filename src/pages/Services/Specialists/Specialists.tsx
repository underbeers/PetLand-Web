import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import SpecialistCard from '../../../components/SpecialistCard/SpecialistCard';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './Specialists.module.css';


const Specialists = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
        {isMobile &&
            <TopBar leftButton={'burger'}>
                <h5>Специалисты</h5>
                <Icons icon={'geo'}/>
            </TopBar>}

        {!isMobile ?
            <div className={styles.title__geo}>
            <h1>Лучшие специалисты</h1>
            <div className={styles.geo}>
                <Icons icon={'geo'}/>
                <p>Город</p>
            </div>
        </div> :
        <h3 className={styles.title}>Лучшие специалисты</h3>
        }
            <div className={styles.cards}>
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
                <SpecialistCard />
            </div>
        </>
    )
}

export default Specialists;
