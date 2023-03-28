import React, {useState} from 'react';
import cn from 'classnames';

import Chips from '../UIKit/Chips';

import styles from './PetCard.module.css'


export interface iPetCardProps {
    petInfo: {
        birthDate: string,
        breed:string,
        gender:string,
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

    function ageFromDateOfBirthday(dateOfBirth: any): number {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    const getWord = (num: number): string => {
        if (num % 100 >= 10 && num % 100 < 20 || num % 10 === 0 || num % 10 > 4) {
            return 'лет';
        }
        if (num % 10 === 1) {
            return 'лет';
        }
        return 'года';
    }

    const petAge = ageFromDateOfBirthday(petInfo.birthDate);

    return (
        <div className={cn(styles.card, styles[size])}>
            <img src={petInfo.photo} alt={'Фото питомца'}
                 className={styles.img}/>
            <div className={styles.pet__info}>
                <h4 className={styles.name}>{petInfo.petName}</h4>
                {size === 'medium' &&
                    <>
                        <div className={styles.type__breed}>
                            <Chips label={petInfo.petType} size={'small'} color={'green'}/>
                            <Chips label={petInfo.breed} size={'small'} color={'green'}/>
                        </div>

                        <div className={styles.gender__age}>
                            <Chips label={petInfo.gender} size={'small'} color={'green'}/>
                            <Chips label={`${petAge} ${getWord(petAge)}`} size={'small'} color={'green'}/>
                        </div>
                    </>
                }
            </div>
        </div>
    );
};

export default PetCard;
