import React, {useContext, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import petService from "../../../services/petService";

import Button from '../../../components/UIKit/Button';
import PetCard, {iPetCardProps} from '../../../components/PetCard/PetCard';

import styles from './Pets.module.css';
import {UserContext} from "../../../userContext";


const Pets: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();
    const [pets, setPets] = useState(Array<iPetCardProps['petInfo']>);

    useEffect(() => {
        if (user.empty) {
            return;
        }
        petService.getFullPetCards(user.userID).then(response => {
            console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
            }
        }).then(body => {
            console.log(body);
            setPets(body);
        });
    }, [user]);



    return (pets ?
            <>
                <div className={styles.title__button}>
                    <h1>Мои питомцы</h1>
                    <Button color={'orange'} text={'Добавить питомца'} onClick={() => navigate('/new-pet')}
                            type={'primary'}/>
                </div>
                <div className={styles.cards}>
                    {
                        pets.map(pet =>
                            <PetCard size={"medium"} petInfo={pet} key={pet.id}/>
                        )
                    }
                </div>
            </>
            :
            <>
                <h1>Мои питомцы</h1>
                <span className={styles.title}>У вас пока нет питомцев</span>
                <div className={styles.text__button}>
                    <p>Если у вас уже есть питомец,<br/> добавьте его описание на PetLand</p>
                    <Button color={'orange'} text={'Добавить питомца'} onClick={() => {
                    }} type={'primary'}/>
                </div>
                <div className={styles.text__button}>
                    <p>Или найдите друга<br/> в объявлениях PetLand</p>
                    <Button color={'green'} text={'Доска объявлений'} onClick={() => {
                    }} type={'primary'}/>
                </div>
            </>
    );
}

export default Pets;
