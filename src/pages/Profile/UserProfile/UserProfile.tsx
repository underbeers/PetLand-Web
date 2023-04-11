import React, {useContext, useState} from 'react';
import {UserContext} from '../../../userContext';

import Button from '../../../components/UIKit/Button';
import Chips from '../../../components/UIKit/Chips';
import Icons from '../../../components/UIKit/Icons';
import PetCard from '../../../components/PetCard/PetCard';
import Image from '../../../components/Image/Image';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './UserProfile.module.css';


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
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Профиль</h5>
                </TopBar>
            }
            {!isMobile ? <h1>Профиль</h1> : <h3 className={styles.title__mobile}>Профиль</h3>}
            <p className={styles.date}>На PetLand с ноября 2022</p>

            {isMobile &&
                <div className={styles.photo__name}>
                    <Image
                        imageProps={{src: user.photo, alt: '', width: '100px', height: '100px'}}
                        borderRadius={'50px 50px 50px 50px'}
                        className={styles.image}/>
                    <h5>Имя<br/>Фамилия</h5>
                </div>
            }
            {isDescription ?
                <div className={styles.description}>
                    <h5>Описание: </h5>
                    <p>Lörem ipsum kuns kudirin. Euren diar vägen miheten. Krorade prertad.
                        Sahyren påpp berade fede. Trar sharenting i mikronar obös. Barriärvård paralödade.
                        Kontratos. Suprasamma kar osam till agnostitos. Terabel dingen, kede parartad. Famis hysa i
                        didoligen. </p>
                </div> :
                <div className={styles.description}>
                    <h5>Описание: </h5>
                    <p style={{marginBottom: '8px'}}>Вы еще не добавили описание</p>
                    <Button color={'green'} text={'Настроить профиль'} onClick={() => {
                    }} type={'primary'}/>
                </div>
            }
            <div className={styles.statistic}>
                {isPets ?
                    <div className={styles.stat__pets}>
                        <h5 className={styles.title__pets}>Питомцы</h5>
                        <p>3 добавленных питомца</p>
                        <div className={styles.pets__block}>
                            <PetCard size={'small'}/>
                            <PetCard size={'small'}/>
                        </div>
                    </div> :
                    <div className={styles.stat__pets}>
                        <h5 className={styles.title__pets}>Питомцы</h5>
                        <p style={{marginBottom: '8px'}}>У вас еще не добавлены питомцы на
                            PetLand</p>
                        <Button color={'orange'} text={'Добавить питомца'} onClick={() => {
                        }} type={'primary'}/>
                    </div>
                }
                <div className={styles.statistic__specialist}>
                    <div className={styles.rating__reviews}>
                        {isRating ?
                            <div className={styles.stat__rating}>
                                <h5>Рейтинг</h5>
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
                                <p>3 завершенных сделки</p>
                            </div>
                            :
                            <div className={styles.stat__rating}>
                                <h5>Рейтинг</h5>
                                <p>Вы еще не совершали сделок</p>
                            </div>
                        }
                        {isReviews ?
                            <div className={styles.reviews}>
                                <h5>Объявления</h5>
                                <a>1 активное объявление</a>
                            </div> :
                            <div className={styles.reviews}>
                                <h5>Объявления</h5>
                                <p>Нет активных объявлений</p>
                            </div>
                        }
                    </div>
                    {isSpecialist &&
                        <div className={styles.specialist}>
                            <h5>Является специалистом</h5>
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
