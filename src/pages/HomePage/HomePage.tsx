import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';

import {specialists} from '../Services/Specialists/Specialists';
import {organizations} from '../Services/Organizations/Organizations';
import {events} from '../Services/Events/Events';

import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import AdCards, {AdCardInfoType} from '../../components/AdCards/AdCards';
import SpecialistCard from '../../components/SpecialistCard/SpecialistCard';
import OrganizationCard from '../../components/OrganizationCard/OrganizationCard';
import EventCard from '../../components/EventCard/EventCard';
import TopBar from '../../components/TopBar/TopBar';

import pets from './img/pets.png';

import styles from './HomePage.module.css'
import AdvertService from "../../services/advertService";


const HomePage: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const navigate = useNavigate();

    const [adverts, setAdverts] = useState<Array<AdCardInfoType>>([]);

    useEffect(()=>{
        AdvertService.getAdverts().then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    //console.log('Error', response);
                    return null;
            }
        }).then((body: {
            nextPage: string,
            records: Array<AdCardInfoType>,
            totalCount: number, totalPage: number}) => {
            if (body) {
                setAdverts(body.records);
            }
        });
    }, []);

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>PetLand</h5>
                    <Icons icon={'geo'}/>
                </TopBar>}
            {!isMobile &&
                <div className={styles.geo}>
                    <Icons icon={'geo'}/>
                    <p>Нижний Новгород</p>
                </div>}
            <div className={styles.main__screen}>
                <div className={styles.title__desc}>
                    <p className={styles.title}>PetLand</p>
                    {!isMobile ?
                        <h1 className={styles.desc}>
                            помощник для владельцев и будущих<br/>владельцев домашних питомцев
                        </h1>
                        :
                        <h3 className={styles.desc}>
                            помощник для владельцев<br/>и будущих владельцев домашних питомцев
                        </h3>
                    }
                </div>
                <img src={pets} alt={'Питомцы'} className={styles.main__photo}/>
            </div>
            <div className={styles.buttons}>
                <Button type={'primary'} color={'green'} text={'Доска объявлений'} onClick={() => {
                    navigate('/bulletin-board')
                }}/>
                <Button type={'primary'} color={'green'} text={'Специалисты'} onClick={() => {
                    navigate('/services/specialists')
                }}/>
                <Button type={'primary'} color={'green'} text={'Клиники и отели'} onClick={() => {
                    navigate('/services/organizations')
                }}/>
                <Button type={'primary'} color={'green'} text={'Мероприятия'} onClick={() => {
                    navigate('/services/events')
                }}/>
            </div>
            <div className={styles.services__blocks}>
                <div className={styles.block}>
                    <div className={styles.title__show}>
                        {!isMobile ? <h2>Новые объявления</h2> : <h4>Новые объявления</h4>}
                        <p className={cn('underlined', styles.show)} onClick={() => {
                            navigate('/bulletin-board')
                        }}>Посмотреть все</p>
                    </div>
                    <div className={styles.cards__block}>
                        {
                            adverts.map((ad, index) =>
                                <AdCards
                                    key={index}
                                    size={'small'}
                                    info={ad}/>)
                        }
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title__show}>
                        {!isMobile ? <h2>Лучшие специалисты</h2> : <h4>Лучшие специалисты</h4>}
                        <p className={cn('underlined', styles.show)} onClick={() => {
                            navigate('/services/specialists')
                        }}>Посмотреть все</p>
                    </div>
                    <div className={styles.cards__block}>
                        {!isMobile ? <>
                                <SpecialistCard {...specialists[0]}/>
                                <SpecialistCard {...specialists[1]}/>
                                <SpecialistCard {...specialists[2]}/>
                                <SpecialistCard {...specialists[3]}/>
                            </> :
                            <>
                                <SpecialistCard {...specialists[0]}/>
                                <SpecialistCard {...specialists[1]}/>
                            </>
                        }
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title__show}>
                        {!isMobile ? <h2>Популярные организации</h2> : <h4>Популярные организации</h4>}
                        <p className={cn('underlined', styles.show)} onClick={() => {
                            navigate('/services/organizations')
                        }}>Посмотреть все</p>
                    </div>
                    <div className={styles.cards__block}>
                        {!isMobile ? <>
                                <OrganizationCard {...organizations[0]}/>
                                <OrganizationCard {...organizations[1]}/>
                                <OrganizationCard {...organizations[2]}/>
                                <OrganizationCard {...organizations[3]}/>
                            </> :
                            <>
                                <OrganizationCard {...organizations[0]}/>
                                <OrganizationCard {...organizations[1]}/>
                            </>}
                    </div>
                </div>
                <div className={styles.block}>
                    <div className={styles.title__show}>
                        {!isMobile ? <h2>Интересные мероприятия</h2> : <h4>Интересные мероприятия</h4>}
                        <p className={cn('underlined', styles.show)} onClick={() => {
                            navigate('/services/events')
                        }}>Посмотреть все</p>
                    </div>
                    <div className={styles.cards__block}>
                        {!isMobile ? <>
                                <EventCard {...events[0]}/>
                                <EventCard {...events[1]}/>
                                <EventCard {...events[3]}/>
                                <EventCard {...events[4]}/>
                            </> :
                            <>
                                <EventCard {...events[0]}/>
                                <EventCard {...events[1]}/>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;
