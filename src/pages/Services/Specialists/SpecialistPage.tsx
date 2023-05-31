import React from 'react';
import {useSearchParams} from 'react-router-dom';

import {specialists} from './Specialists';
import {useIsMobileContext} from '../../../contexts/isMobileContext';

import TopBar from '../../../components/TopBar/TopBar';
import Stars from '../../../components/Stars/Stars';
import Page404 from '../../Page404/Page404';

import styles from './SpecialistPage.module.css';


const getSpecById = (id: string | null) => {
    if (id == null) {
        return id;
    }
    for (let i = 0; i < specialists.length; i++) {
        if (specialists[i].id == id) {
            return (specialists[i]);
        }
    }
    return null;
}

const SpecialistPage = () => {
    const isMobile = useIsMobileContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const id = searchParams.get('id');
    const specialist = getSpecById(id);

    if (specialist == null) {
        return <Page404/>;
    }

    return (
        <>
            {!isMobile ?
                <div className={styles.name__favorite}>
                    <h1 className={styles.name}>{specialist.name}</h1>
                </div> :
                <TopBar leftButton={'burger'}>
                    <h5>{specialist.name}</h5>
                </TopBar>
            }
            <div className={styles.photo__info}>
                <img className={styles.photo} src={specialist.photo} alt={'Фото специалиста'}></img>
                <div className={styles.info}>
                    <div className={styles.rating}>
                        <h3>Рейтинг:</h3>
                        <div className={styles.stars__reviews}>
                            <p>{specialist.rating}</p>
                            <Stars rating={specialist.rating}/>
                        </div>
                    </div>
                    <div className={styles.speciality}>
                        <h3>Специальность:</h3>
                        <p>{specialist.speciality}</p>
                    </div>
                    <div className={styles.experience}>
                        <h3>Стаж:</h3>
                        <p>{specialist.experience}</p>
                    </div>
                    <div className={styles.pets}>
                        <h3>Животные:</h3>
                        <p>{specialist.pets}</p>
                    </div>
                    <h3>{specialist.place}</h3>
                    <div className={styles.contacts}>
                        <h3>Контакты:</h3>
                        <p>{specialist.phone}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SpecialistPage;
