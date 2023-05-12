import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './OrganizationPage.module.css';


const OrganizationPage = () => {

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

    return (
        <>
            {!isMobile ?
                <div className={styles.name__favorite}>
                    <Icons icon={'arrow-left'} className={styles.icon__arrow__back} onClick={handleGoBack}/>
                    <h1 className={styles.name}>Название организации</h1>
                    <div className={styles.favorite}>
                        <h5>В избранное</h5>
                        {!isLiked ?
                            <Icons icon={'cards-heart-outline'} className={styles.icon__heart} onClick={() => {setIsLiked(!isLiked)}}/>
                        :
                            <Icons icon={'cards-heart'} className={styles.icon__heart} onClick={() => {setIsLiked(!isLiked)}}/>
                        }

                    </div>
                </div> :
                <TopBar leftButton={'arrow'}>
                    <h5>Название организации</h5>
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

                    <div className={styles.type}>
                        <h3>Тип:</h3>
                        <p>Ветеринарная клиника</p>
                    </div>

                    <div className={styles.schedule}>
                        <h3>График работы:</h3>
                        <p>пн-пт: 10:00 - 18:00</p>
                        <p>сб-вс: 12:00 - 18:00</p>
                    </div>

                    <div className={styles.address}>
                        <h3>Адрес:</h3>
                        <p>г. Нижний Новгород, ул. Плотникова, 3 </p>
                    </div>

                    <div className={styles.contacts}>
                        <h3>Контакты:</h3>
                        <p>8 800 111 22 33</p>
                    </div>

                </div>
            </div>


        </>
    )
}

export default OrganizationPage;
