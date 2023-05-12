import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';

import styles from './AllServices.module.css';


const AllServices = () => {

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>

        {isMobile &&
            <TopBar leftButton={'burger'}>
                <h5>Сервисы</h5>
            </TopBar>}

        {!isMobile ?
            <div className={styles.title__desc}>
                <h1>Сервисы</h1>
                <p>Попробуйте все сервисы PetLand,<br/>чтобы улучшить жизнь ваших питомцев</p>
            </div> :
            <div className={styles.desc}>
                <p>Попробуйте все сервисы PetLand,<br/>чтобы улучшить жизнь ваших питомцев</p>
            </div>
        }

        {!isMobile ?
            <div className={styles.services}>
                <div className={styles.card}>
                    <div className={styles.title__desc__card}>
                        <h2>Специалисты</h2>
                        <p>Найдите подходящих ветеринаров,<br/>кинологов, грумеров для ваших питомцев</p>
                    </div>

                    <Icons icon={'doctor'} className={styles.spec__icon}/>

                    <Button type={'secondary'} onClick={() => {
                        navigate('/services/specialists')
                    }} color={'orange'} text={'Найти'} className={styles.button}/>
                </div>

                <div className={styles.card}>
                    <div className={styles.title__desc__card}>
                        <h2>Клиники и отели</h2>
                        <p>Выберите лучшую ветклинику<br/>или гостиницу для животных</p>
                    </div>

                    <Icons icon={'hospital'} className={styles.org__icon}/>

                    <Button type={'secondary'} onClick={() => {
                        navigate('/services/organizations')
                    }} color={'orange'} text={'Выбрать'} className={styles.button}/>
                </div>

                <div className={styles.card}>
                    <div className={styles.title__desc__card}>
                        <h2>Мероприятия</h2>
                        <p>Посещайте лекции от экспертов, выставки животных и другие события про питомцев</p>
                    </div>

                    <Icons icon={'calendar-multiple'} className={styles.events__icon}/>

                    <Button type={'secondary'} onClick={() => {
                        navigate('/services/events')
                    }} color={'orange'} text={'Посетить'} className={styles.button}/>
                </div>
            </div>
            :
            <div className={styles.services__mobile}>
                <div className={styles.item} onClick={() => {navigate('/services/specialists')}}>
                    <Icons icon={'doctor'} className={styles.spec__icon__mobile}/>
                    <div className={styles.text__item}>
                        <h4>Специалисты</h4>
                        <p className={'secondary__text-2'}>Найдите подходящих ветеринаров,<br/>кинологов, грумеров для
                            ваших питомцев</p>
                    </div>
                </div>

                <div className={styles.item} onClick={() => {navigate('/services/organizations')}}>
                    <Icons icon={'hospital'} className={styles.org__icon__mobile}/>
                    <div className={styles.text__item}>
                        <h4>Клиники и отели</h4>
                        <p className={'secondary__text-2'}>Выберите лучшую ветклинику<br/>или гостиницу для животных</p>
                    </div>
                </div>

                <div className={styles.item} onClick={() => {navigate('/services/events')}}>
                    <Icons icon={'calendar-multiple'} className={styles.events__icon__mobile}/>
                    <div className={styles.text__item}>
                        <h4>Мероприятия</h4>
                        <p className={'secondary__text-2'}>Посещайте лекции от экспертов,<br/>выставки животных и другие
                            события</p>
                    </div>
                </div>
            </div>
        }

        </>
    )
}

export default AllServices;
