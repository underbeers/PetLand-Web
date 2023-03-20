import React, {useContext, useState} from 'react';
import cn from 'classnames';

import {UserContext} from '../../../userContext';

import Button from '../../../components/UIKit/Button';
import Chips from '../../../components/UIKit/Chips';
import Icons from '../../../components/UIKit/Icons';

import PetCard from '../../../components/PetCard/PetCard';
import Image from '../../../components/Image/Image';

import styles from './UserProfile.module.css';
import TopBar from "../../../components/TopBar/TopBar";


const UserProfile = () => {

    const [isDescription, setIsDescription] = useState(true);
    const [isPets, setIsPets] = useState(true);
    const [isRating, setIsRating] = useState(true);
    const [isReviews, setIsReviews] = useState(true);
    const [isSpecialist, setIsSpecialist] = useState(true);

    const {user, setUser} = useContext(UserContext);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>

            <TopBar leftButton={'burger'}>
            Профиль
            </TopBar>

            <h1 className={styles.title}>Профиль</h1>
            <p className={cn('subtext', styles.date)}>На PetLand с ноября 2022</p>

            {isMobile &&
                <div className={styles.photo__name}>
                    <Image
                        imageProps={{src: user.photo, alt: '', width: '100px', height: '100px'}}
                        borderRadius={'50px 50px 50px 50px'}
                        className={styles.image}/>
                    <h2>Имя<br/>Фамилия</h2>
                </div>
            }
            {isDescription ?
                <div className={styles.description}>
                    <h2>Описание: </h2>
                    <p className={'text'}>Lörem ipsum kuns kudirin. Euren diar vägen miheten. Krorade prertad.
                        Sahyren påpp berade fede. Trar sharenting i mikronar obös. Barriärvård paralödade.
                        Kontratos. Suprasamma kar osam till agnostitos. Terabel dingen, kede parartad. Famis hysa i
                        didoligen. </p>
                </div> :
                <div className={styles.description}>
                    <h2>Описание: </h2>
                    <p className={'text'} style={{marginBottom: '8px'}}>Вы еще не добавили описание</p>
                    <Button color={'green'} text={'Настроить профиль'} onClick={() => {
                    }} type={'primary'}/>
                </div>
            }
            <div className={styles.statistic}>
                {isPets ?
                    <div className={styles.stat__pets}>
                        <h2 className={styles.title__pets}>Питомцы</h2>
                        <p className={'text'}>3 добавленных питомца</p>
                        <div className={styles.pets__block}>
                            <PetCard size={'small'}/>
                            <PetCard size={'small'}/>
                        </div>
                    </div> :
                    <div className={styles.stat__pets}>
                        <h2 className={styles.title__pets}>Питомцы</h2>
                        <p className={'text'} style={{marginBottom: '8px'}}>У вас еще не добавлены питомцы на
                            PetLand</p>
                        <Button color={'orange'} text={'Добавить питомца'} onClick={() => {
                        }} type={'primary'}/>
                    </div>
                }
                <div className={styles.statistic__specialist}>
                    <div className={styles.rating__reviews}>
                        {isRating ?
                            <div className={styles.stat__rating}>
                                <h2>Рейтинг</h2>
                                <div className={styles.stars__reviews}>
                                    <div className={styles.stars}>
                                        <Icons icon={'round-star'}/>
                                        <Icons icon={'round-star'}/>
                                        <Icons icon={'round-star'}/>
                                        <Icons icon={'round-star'}/>
                                        <Icons icon={'round-star'}/>
                                    </div>
                                    <span>4,0</span>
                                    <a href={'#'}>2 отзыва</a>
                                </div>
                                <p className={'text'}>3 завершенных сделки</p>
                            </div>
                            :
                            <div className={styles.stat__rating}>
                                <h2>Рейтинг</h2>
                                <p className={'text'}>Вы еще не совершали сделок</p>
                            </div>
                        }
                        {isReviews ?
                            <div className={styles.reviews}>
                                <h2>Объявления</h2>
                                <a>1 активное объявление</a>
                            </div> :
                            <div className={styles.reviews}>
                                <h2>Объявления</h2>
                                <p className={'text'}>Нет активных объявлений</p>
                            </div>
                        }
                    </div>
                    {isSpecialist &&
                        <div className={styles.specialist}>
                            <h2>Является специалистом</h2>
                            <Chips label={'Кинолог'} size={'medium'} color={'grey'}/>
                            <a href={'#'} className={styles.to__page__spec}>Страница специалиста</a>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default UserProfile;
