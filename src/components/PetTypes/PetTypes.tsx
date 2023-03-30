import React, {useContext, useState} from 'react';

import cat from './img/cat.png';
import dog from './img/dog.png';
import chinchilla from './img/chinchilla.png';
import parrot from './img/parrot.png';

import styles from './PetTypes.module.css';


const PetTypes = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);


    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 760)
    });

    return (
        <div className={styles.types__wrapper}>
            <div className={styles.all__types}>
                <div className={styles.type} onClick={() => {}}>
                    {!isMobile ? <h3>Кошки</h3> : <h5>Кошки</h5>}
                    <img src={cat} alt={'Кошка'} className={styles.photo}/>
                </div>
                <div className={styles.type} onClick={() => {}}>
                    {!isMobile ? <h3>Собаки</h3> : <h5>Собаки</h5>}
                    <img src={dog} alt={'Собака'} className={styles.photo}/>
                </div>
                <div className={styles.type} onClick={() => {}}>
                    {!isMobile ? <h3>Грызуны</h3> : <h5>Грызуны</h5>}
                    <img src={chinchilla} alt={'Шиншилла'} className={styles.photo}/>
                </div>
                <div className={styles.type} onClick={() => {}}>
                    {!isMobile ? <h3>Птицы</h3> : <h5>Птицы</h5>}
                    <img src={parrot} alt={'Попугай'} className={styles.photo}/>
                </div>
            </div>
        </div>
    )
}
export default PetTypes;
