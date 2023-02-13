import React, {useState} from 'react';

import styles from './PetCard.module.css'
import Image from '../Image/Image'
import cn from 'classnames';



const PetCard = () => {

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
        <div className={styles.wrapper}>
            <Image imageProps={{src: 'https://w-dog.ru/wallpapers/5/15/481641983153237/kot-lezhit-polosatyj.jpg', alt: 'Питомец', width: isMobile ? '260px' : '273px' , height: isMobile ? '180px' : '200px'}}
                   borderRadius={'20px 20px 0 0'}/>
            <div className={styles.pet__info}>

                <h1 className={styles.name}>{petName}</h1>
                <div className={styles.type__breed}>
                    <span className={cn(styles.pet__tag, 'subtext')}>{petType}</span>
                    <span className={cn(styles.pet__tag, 'subtext')}>{petBreed}</span>
                </div>

                <div className={styles.gender__age}>
                    <span className={cn(styles.pet__tag, 'subtext')}>{petGender}</span>
                    <span className={cn(styles.pet__tag, 'subtext')}>{petAge}</span>
                </div>
            </div>
        </div>
    )
};

export default PetCard;
