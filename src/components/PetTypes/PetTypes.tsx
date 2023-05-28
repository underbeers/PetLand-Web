import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import {useIsMobileContext} from '../../contexts/isMobileContext';

import cat from './img/cat.png';
import dog from './img/dog.png';
import chinchilla from './img/chinchilla.png';
import parrot from './img/parrot.png';

import styles from './PetTypes.module.css';


const PetTypes = () => {
    const isMobile = useIsMobileContext();

    return (
        <div className={styles.types__wrapper}>
            <div className={styles.all__types}>
                <NavLink to={'/adverts?type=кошки'} className={styles.type} onClick={() => {
                }}>
                    {!isMobile ? <h3>Кошки</h3> : <h5>Кошки</h5>}
                    <img src={cat} alt={'Кошка'} className={styles.photo}/>
                </NavLink>
                <NavLink to={'/adverts?type=собаки'} className={styles.type} onClick={() => {
                }}>
                    {!isMobile ? <h3>Собаки</h3> : <h5>Собаки</h5>}
                    <img src={dog} alt={'Собака'} className={styles.photo}/>
                </NavLink>
                <NavLink to={'/adverts?type=грызуны'} className={styles.type} onClick={() => {
                }}>
                    {!isMobile ? <h3>Грызуны</h3> : <h5>Грызуны</h5>}
                    <img src={chinchilla} alt={'Шиншилла'} className={styles.photo}/>
                </NavLink>
                <NavLink to={'/adverts?type=птицы'} className={styles.type} onClick={() => {
                }}>
                    {!isMobile ? <h3>Птицы</h3> : <h5>Птицы</h5>}
                    <img src={parrot} alt={'Попугай'} className={styles.photo}/>
                </NavLink>
            </div>
        </div>
    );
};

export default PetTypes;
