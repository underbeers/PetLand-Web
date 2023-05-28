import React from 'react'
import {NavLink} from 'react-router-dom';
import cn from 'classnames';

import {useIsMobileContext} from '../../contexts/isMobileContext';

import Chips from '../UIKit/Chips';

import styles from './PetCard.module.css'


export interface iPetCardProps {
    petInfo: {
        birthDate: string,
        breed: string,
        gender: string,
        id: string,
        petName: string,
        petType: string,
        photo: string
    },
    size: 'small' | 'medium',
    url: string
}

const ageFromDateOfBirthdayInMonths: (dateOfBirth: string) => number = (dateOfBirth) => {
    const today = new Date();
    let birthday = new Date(dateOfBirth);
    birthday.setMinutes(birthday.getMinutes() - today.getTimezoneOffset());
    return (today.getFullYear() - birthday.getFullYear()) * 12 + today.getMonth() - birthday.getMonth();
}

const getWord = (num: number, scale: 'years' | 'months'): string => {
    const numCopy = scale == 'years' ? Math.floor(num / 12) : num;
    if (numCopy % 100 >= 10 && numCopy % 100 < 20 || numCopy % 10 === 0 || numCopy % 10 > 4) {
        return scale == 'years' ? 'лет' : 'месяцев';
    }
    if (numCopy % 10 === 1) {
        return scale == 'years' ? 'год' : 'месяц';
    }
    return scale == 'years' ? 'года' : 'месяца';
}

export const getAge: (dateOfBirth: string) => string = (dateOfBirth) => {
    const petAgeNumber = ageFromDateOfBirthdayInMonths(dateOfBirth);
    return petAgeNumber > 11 ? `${Math.floor(petAgeNumber / 12)} ${getWord(petAgeNumber, 'years')}`
        : `${petAgeNumber} ${getWord(petAgeNumber, 'months')}`
}

const PetCard: React.FC<iPetCardProps> = ({petInfo, size, url}) => {
    const isMobile = useIsMobileContext();

    return (
        <NavLink target={'_blank'} to={url} className={cn(styles.card, styles[size])}>
            <img src={petInfo.photo} alt={'Фото питомца'} className={styles.img}/>
            <div className={styles.pet__info}>
                {!isMobile ?
                    <h4>{petInfo.petName}</h4>
                    :
                    <h3>{petInfo.petName}</h3>
                }
                {size === 'medium' &&
                    <div className={styles.chips}>
                        <Chips label={petInfo.breed} size={'small'} color={'green'}/>
                        <Chips label={petInfo.petType} size={'small'} color={'green'}/>
                        <Chips label={petInfo.gender} size={'small'} color={'green'}/>
                        <Chips label={getAge(petInfo.birthDate)} size={'small'} color={'green'}/>
                    </div>
                }
            </div>
        </NavLink>
    );
};

export default PetCard;
