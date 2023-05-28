import React from 'react';
import {useSearchParams} from 'react-router-dom';

import {organizations} from './Organizations';
import {useIsMobileContext} from '../../../contexts/isMobileContext';

import TopBar from '../../../components/TopBar/TopBar';
import Stars from '../../../components/Stars/Stars';
import Page404 from '../../Page404/Page404';

import styles from './OrganizationPage.module.css';


const getOrganizationById = (id: string | null) => {
    if (id === null) {
        return id;
    }
    for (let i = 0; i < organizations.length; i++) {
        if (organizations[i].id === id) {
            return (organizations[i]);
        }
    }
    return null;
}

const OrganizationPage = () => {
    const isMobile = useIsMobileContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');

    const organization = getOrganizationById(id);

    if (organization == null) {
        return <Page404/>;
    }

    return (
        <>
            {!isMobile ?
                <div className={styles.name__favorite}>
                    <h1 className={styles.name}>{organization.name}</h1>
                </div> :
                <TopBar leftButton={'arrow'}>
                    <h5>{organization.name}</h5>
                </TopBar>
            }
            <div className={styles.photo__info}>
                <img src={organization.photo} className={styles.photo}/>
                <div className={styles.info}>
                    <div className={styles.rating}>
                        <h3>Рейтинг:</h3>
                        <div className={styles.stars__reviews}>
                            <p>{organization.rating}</p>
                            <Stars rating={organization.rating}/>
                        </div>
                    </div>
                    <div className={styles.type}>
                        <h3>Тип:</h3>
                        <p>{organization.type}</p>
                    </div>
                    <div className={styles.schedule}>
                        <h3>График работы:</h3>
                        <p>{organization.schedule}</p>
                    </div>
                    <div className={styles.address}>
                        <h3>Адрес:</h3>
                        <p>{organization.address}</p>
                    </div>
                    <div className={styles.contacts}>
                        <h3>Контакты:</h3>
                        <p>{organization.phone}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrganizationPage;
