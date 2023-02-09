import React from 'react';
import SideBarProfile from "../../../components/SideBarProfile/SideBarProfile";
import PetCard from "../../../components/PetCard/PetCard";

import styles from './Pets.module.css'
import Button from "../../../components/UIKit/Button";


const Pets: React.FC = () => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.title__button}>
                    <h1>Мои питомцы</h1>
                    <Button color={'orange'} label={'Добавить питомца'} onClick={() => {}} size={'medium'} type={'fill'}/>
                </div>
                <PetCard />
                <PetCard />
            </div>
        </>
    );
}

export default Pets;