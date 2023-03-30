import React, {useState} from 'react';
import cn from 'classnames';

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
    };
    size: 'small' | 'medium'
}

const PetCard: React.FC<iPetCardProps> = ({size, petInfo}) => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700);
    });

    function ageFromDateOfBirthdayInMonths(dateOfBirth: string): number {
        const today = new Date();
        const birthday = new Date(dateOfBirth);
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

    const petAge = ageFromDateOfBirthdayInMonths(petInfo.birthDate);

    return (
        <div className={cn(styles.card, styles[size])}>
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
                        <Chips label={petAge > 11 ? `${Math.floor(petAge / 12)} ${getWord(petAge, 'years')}`
                            : `${petAge} ${getWord(petAge, 'months')}`} size={'small'} color={'green'}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default PetCard;
