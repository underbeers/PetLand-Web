import React from 'react';

import styles from './PetCard.module.css'
import Image from '../Image/Image'
import cn from 'classnames';



const PetCard = () => {

    const petName = 'Кличка'
    const petType = 'вид';
    const petBreed = 'порода';
    const petGender = 'пол';
    const petAge = '2 года';

    const windowWidth = window.innerWidth;

    return (

        <div className={styles.wrapper}>
            <Image imageProps={{src: 'https://w-dog.ru/wallpapers/5/15/481641983153237/kot-lezhit-polosatyj.jpg', alt: 'Питомец', width:windowWidth > 700 ? '273px' : '260px', height: windowWidth > 700 ? '200px' : '180px'}}
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
