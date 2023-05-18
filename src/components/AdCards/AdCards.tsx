import React, {useState} from 'react';
import cn from 'classnames';
import {NavLink} from 'react-router-dom';

import Icons from '../UIKit/Icons';
import Chips from '../UIKit/Chips';

import styles from './AdCards.module.css';
import {getAge} from "../PetCard/PetCard";


export type AdCardInfoType = {
    birthDate: string,
    breed: string,
    city: string,
    description: string,
    district: string,
    gender: string,
    id: number,
    mainPhoto: string,
    petCardID: number,
    petName: string,
    petType: string,
    price: number,
    publication: string,
    userID: string
}
interface iAdCardProps {
    size: 'big' | 'small',
    info: AdCardInfoType
}

const AdCards: React.FC<iAdCardProps> = ({size, info}) => {

    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });
    const date = new Date();
    let publication = new Date(info.publication);
    publication.setMinutes(publication.getMinutes() - date.getTimezoneOffset());

    const publicationDate = publication.toJSON().substring(0, 10).split('-').reverse().join('.');
    const publicationTime = publication.toJSON().substring(11, 16);

    return (
        <NavLink to={`/ad-page?id=${info.id}`} className={cn(styles.card, styles[size])}>
            <img className={styles.photo}
                 src={info.mainPhoto}/>
            <div className={styles.ad__content}>
                <div className={styles.name__like}>
                    <div className={styles.name__price}>
                        {!isMobile ? <h4>{info.petName}</h4> : <h5>{info.petName}</h5>}
                        <p>{info.price < 0 ? 'Цена договорная' : info.price === 0 ? 'Бесплатно' : `${info.price} ₽`}</p>
                    </div>
                    {isLiked ?
                        <Icons icon={'cards-heart'} className={styles.heart} onClick={(event) => {
                            event.preventDefault();
                            setIsLiked(!isLiked);
                        }}/> :
                        <Icons icon={'cards-heart-outline'} className={styles.heart}
                               onClick={(event) => {
                                   event.preventDefault();
                                   setIsLiked(!isLiked);
                               }}/>}
                </div>
                {size === 'big' &&
                    <div className={styles.chips}>
                        <Chips color={'green'} size={'small'} label={info.petType}/>
                        <Chips color={'green'} size={'small'} label={info.breed}/>
                        <Chips color={'green'} size={'small'} label={info.gender}/>
                        <Chips color={'green'} size={'small'} label={getAge(info.birthDate)}/>
                    </div>
                }
                <div className={styles.description__info}>
                    {size === 'big' &&
                        <p className={styles.description}>
                            {info.description}
                        </p>}
                    <div className={styles.info}>
                        {size === 'big' && <p className={styles.name__owner}>{info.userID}</p>}
                        <p className={styles.address__date}>{info.district} р-н</p>
                        <p className={styles.address__date}>{publicationDate} {publicationTime}</p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default AdCards;
