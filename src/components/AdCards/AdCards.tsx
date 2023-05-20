import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {getAge} from '../PetCard/PetCard';

import Icons from '../UIKit/Icons';
import Chips from '../UIKit/Chips';

import styles from './AdCards.module.css';


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

export const prettyAdPrice = (price: number) => {
    return price < 0 ? 'Цена договорная' : price === 0 ? 'Бесплатно' : `${price} ₽`;
}

export const prettyPublicationTime = (publication: string) => {
    const date = new Date();
    let pub = new Date(publication);
    pub.setMinutes(pub.getMinutes() - date.getTimezoneOffset());

    const publicationDate = pub.toJSON().substring(0, 10).split('-').reverse().join('.');
    const publicationTime = pub.toJSON().substring(11, 16);
    return {date: publicationDate, time: publicationTime}
}

const AdCards: React.FC<iAdCardProps> = ({size, info}) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const publication = prettyPublicationTime(info.publication);
    return (
        <NavLink to={`/ad-page?id=${info.id}`} className={cn(styles.card, styles[size])}>
            <img className={styles.photo}
                 src={info.mainPhoto}/>
            <div className={styles.ad__content}>
                <div className={styles.name__like}>
                    <div className={styles.name__price}>
                        {!isMobile ? <h4>{info.petName}</h4> : <h5>{info.petName}</h5>}
                        <p>{prettyAdPrice(info.price)}</p>
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
                        <p className={styles.address__date}>г. {info.city} {info.district} р-н</p>
                        <p className={styles.address__date}>{publication.date} {publication.time}</p>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default AdCards;
