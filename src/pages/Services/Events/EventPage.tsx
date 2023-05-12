import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Icons from '../../../components/UIKit/Icons';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './EventPage.module.css';


const EventPage = () => {

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
                    <h1 className={styles.name}>Название мероприятия</h1>
                </div> :
                <TopBar leftButton={'arrow'}>
                    <h5>Название мероприятия</h5>
                </TopBar>
            }

            <div className={styles.photo__info}>
                <div className={styles.photo}></div>
                <div className={styles.info}>
                    <div className={styles.description}>
                        <h3>Описание:</h3>
                        <p>Позвольте представить уникальную выставку домашних питомцев! На этой выставке вы сможете увидеть самых разных животных - от котов и собак до грызунов и рептилий. Питомцы будут представлены в разных возрастах, размерах и породах, так что каждый найдет здесь себе подходящего друга.
                            Во время выставки вы сможете узнать много интересного о жизни и уходе за домашними питомцами. Здесь вы встретите профессиональных ветеринаров, которые поделятся с вами своими знаниями и советами. Также будут проводиться конкурсы и розыгрыши призов для всех посетителей.
                            Выставка домашних питомцев - это отличный способ провести время в кругу своей семьи и друзей, и, возможно, найти своего будущего питомца. Приходите и наслаждайтесь общением с этими прекрасными созданиями!</p>
                    </div>

                    <div className={styles.place}>
                        <h3>Место:</h3>
                        <p>Дом культуры 'Газ'</p>
                    </div>

                    <div className={styles.date}>
                        <h3>Дата:</h3>
                        <p>дд.мм.гггг</p>
                    </div>

                    <div className={styles.price}>
                        <h3>Цена:</h3>
                        <p>700 ₽</p>
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

export default EventPage;
