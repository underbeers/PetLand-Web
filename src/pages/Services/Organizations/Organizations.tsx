import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';
import OrganizationCard from '../../../components/OrganizationCard/OrganizationCard';

import styles from './Organizations.module.css';


const Organizations = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Организации</h5>
                    <Icons icon={'geo'}/>
                </TopBar>}

            {!isMobile ?
                <div className={styles.title__geo}>
                    <h1>Популярные организации</h1>
                    <div className={styles.geo}>
                        <Icons icon={'geo'}/>
                        <p>Город</p>
                    </div>
                </div> :
                <h3 className={styles.title}>Популярные организации</h3>
            }

            <div className={styles.cards}>
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
                <OrganizationCard />
            </div>
        </>
    )
}

export default Organizations;
