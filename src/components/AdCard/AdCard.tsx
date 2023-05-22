import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {getAge} from '../PetCard/PetCard';

import Icons from '../UIKit/Icons';
import Chips from '../UIKit/Chips';

import styles from './AdCard.module.css';
import {useUserContext} from "../../contexts/userContext";
import FavoritesService from "../../services/favoritesService";


export type AdCardInfoType = {
    birthDate: string,
    breed: string,
    city: string,
    description: string,
    district: string,
    favoritesID: number,
    gender: string,
    id: number,
    inFavorites: boolean,
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

const AdCard: React.FC<iAdCardProps> = ({size, info}) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    const {user, setUser} = useUserContext();

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700);
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
                    {!user.empty &&
                        <Icons icon={info.inFavorites ? 'cards-heart' : 'cards-heart-outline'} className={styles.heart}
                               onClick={(e) => {
                                   e.preventDefault();
                                   setTimeout(()=>setUser({...user}), 100);
                                   if (info.inFavorites) {
                                       FavoritesService.deleteFromFavorites({id: info.favoritesID}, user.accessToken).then(response => {
                                           console.log(response);
                                           return response.json();
                                       }).then(body => console.log(body));
                                   } else {
                                       FavoritesService.addToFavorites({
                                           type: 'advert',
                                           id: info.id
                                       }, user.accessToken).then(response => {
                                           console.log(response);
                                       });
                                   }
                               }}
                        />
                    }
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

export default AdCard;
