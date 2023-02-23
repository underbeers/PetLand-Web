import React, {useState} from 'react';
import cn from 'classnames';

import Chips from '../UIKit/Chips';

import styles from './PetCard.module.css'


interface iPetCardProps {
    size: 'small' | 'medium'
}

const PetCard: React.FC<iPetCardProps> = ({size}) => {

    const petName = 'Кличка'
    const petType = 'вид';
    const petBreed = 'порода';
    const petGender = 'пол';
    const petAge = '2 года';

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });


    return (
        <div className={cn(styles.card, styles[size])}>
            <img src={'https://w-dog.ru/wallpapers/5/15/481641983153237/kot-lezhit-polosatyj.jpg'} alt={'Питомец'}
                 className={styles.img}/>
            <div className={styles.pet__info}>

                <h1 className={styles.name}>{petName}</h1>

                {size === 'medium' &&
                    <>
                        <div className={styles.type__breed}>
                            <Chips label={petType} size={'small'} color={'green'}/>
                            <Chips label={petBreed} size={'small'} color={'green'}/>
                        </div>

                        <div className={styles.gender__age}>
                            <Chips label={petGender} size={'small'} color={'green'}/>
                            <Chips label={petAge} size={'small'} color={'green'}/>
                        </div>
                    </>
                }

            </div>
        </div>
    )
};

export default PetCard;
