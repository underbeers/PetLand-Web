import React, {useState} from 'react';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './SpecialistPage.module.css';


const SpecialistPage = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const [isLiked, setIsLiked] = useState(false);

    return (
        <>

            {!isMobile ?
                <div className={styles.name__favorite}>
                    <Icons icon={'arrow-left'} className={styles.icon__arrow__back}/>
                    <h1 className={styles.name}>Имя Фамилия</h1>
                    <div className={styles.favorite}>
                        <h5>В избранное</h5>
                        <Icons icon={'cards-heart-outline'} className={styles.icon__heart}/>
                    </div>
                </div> :
                <TopBar leftButton={'arrow'}>
                    <h5>Имя Фамилия</h5>
                    {!isLiked ?
                        <Icons icon={'cards-heart-outline'} onClick={() => {
                            setIsLiked(!isLiked)
                        }} className={styles.heart__topbar}/> :
                        <Icons icon={'cards-heart'} onClick={() => {
                            setIsLiked(!isLiked)
                        }} className={styles.heart__topbar}/>
                    }
                </TopBar>
            }


            <div className={styles.photo__info}>
                <div className={styles.photo}></div>
                <div className={styles.info}>
                    <div className={styles.rating}>
                        <h3>Рейтинг:</h3>
                        <div className={styles.stars__reviews}>
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
                        <p>Ветеринар, УЗИ</p>
                    </div>

                    <div className={styles.experience}>
                        <h3>Стаж:</h3>
                        <p>5 лет</p>
                    </div>

                    <div className={styles.pets}>
                        <h3>Животные:</h3>
                        <p>Кошки, собаки, грызуны</p>
                    </div>

                    <h3>Принимает в клинике «Лапа»</h3>

                    <div className={styles.contacts}>
                        <h3>Контакты:</h3>
                        <p>8 800 111 22 33</p>
                    </div>

                </div>
            </div>
        </>
    )
}

export default SpecialistPage;
