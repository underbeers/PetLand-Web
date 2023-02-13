import React from 'react';

import Button from "../../../components/UIKit/Button";

import PetCard from "../../../components/PetCard/PetCard";

import styles from './Pets.module.css'


const Pets: React.FC = () => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.title__button}>
                    <h1>Мои питомцы</h1>
                    <Button color={'orange'} label={'Добавить питомца'} onClick={() => {}} size={'medium'} type={'fill'}/>
                </div>
                <div className={styles.cards}>
                    <PetCard />
                    <PetCard />
                    <PetCard />
                    <PetCard />
                </div>
            </div>
        </>
    );
}

export default Pets;