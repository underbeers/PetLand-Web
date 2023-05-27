import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {specialists} from './Specialists';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';
import Page404 from '../../Page404/Page404';

import styles from './SpecialistPage.module.css';


const getSpecById = (id: string | null) => {
    if (id === null) {
        return id;
    }
    for (let i = 0; i < specialists.length; i++) {
        if (specialists[i].id === id) {
            return (specialists[i]);
        }
    }
    return null;
}

const SpecialistPage = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const [isLiked, setIsLiked] = useState(false);

    const navigate = useNavigate();

    const handleGoBack: React.MouseEventHandler<SVGSVGElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

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
                    <Icons icon={'arrow-left'} className={styles.icon__arrow__back} onClick={handleGoBack}/>
                    <h1 className={styles.name}>{specialist.name}</h1>
                </div> :
                <TopBar leftButton={'arrow'}>
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
                            <div className={styles.stars}>
                                <Icons icon={'round-star'}/>
                                <Icons icon={'round-star'}/>
                                <Icons icon={'round-star'}/>
                                <Icons icon={'round-star'}/>
                                <Icons icon={'round-star'}/>
                            </div>
                            <p className={'underlined'}>10 отзывов</p>
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
