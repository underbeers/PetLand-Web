import React, {useState} from 'react';

import Button from '../../../components/UIKit/Button';
import PetCard from '../../../components/PetCard/PetCard';

import styles from './Pets.module.css'


const Pets: React.FC = () => {

    const [isEmpty, setIsEmpty] = useState(false)

    return (!isEmpty ?
            <div className={styles.content}>
                <div className={styles.title__button}>
                    <h1>Мои питомцы</h1>
                    <Button color={'orange'} label={'Добавить питомца'} onClick={() => {}} size={'medium'} type={'fill'}/>
                </div>
                <div className={styles.cards}>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                </div>
            </div>
            :
            <div className={styles.content}>
                <h1>Мои питомцы</h1>
                <span className={styles.title}>У вас пока нет питомцев</span>
                <div className={styles.text__button}>
                    <p>Если у вас уже есть питомец,<br/> добавьте его описание на PetLand</p>
                    <Button color={'orange'} label={'Добавить питомца'} onClick={() => {}} size={'small'} type={'fill'}/>
                </div>
                <div className={styles.text__button}>
                    <p>Или найдите друга<br/> в объявлениях PetLand</p>
                    <Button color={'green'} label={'Доска объявлений'} onClick={() => {}} size={'small'} type={'fill'}/>
                </div>
            </div>
    );
}

export default Pets;
