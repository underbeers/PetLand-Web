import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {useUserContext} from '../../../contexts/userContext';
import {useIsMobileContext} from '../../../contexts/isMobileContext';
import petService from '../../../services/petService';

import PetCard, {iPetCardProps} from '../../../components/PetCard/PetCard';
import TopBar from '../../../components/TopBar/TopBar';

import Icons from '../../../components/UIKit/Icons';
import Button from '../../../components/UIKit/Button';

import styles from './Pets.module.css';


const Pets: React.FC = () => {
    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();
    const [pets, setPets] = useState<Array<iPetCardProps['petInfo']>>([]);

    useEffect(() => {
        if (user.empty) {
            return;
        }
        petService.getShortPetCards(user.userID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
            }
        }).then(body => {
            //console.log(body);
            setPets(body);
        });
    }, [user]);

    return (
        <>
            {isMobile ?
                <TopBar leftButton={'burger'}>
                    <h5>Питомцы</h5>
                    <Icons icon={'plus-circle-outline'} onClick={() => navigate('/new-pet')}/>
                </TopBar>
                :
                <div className={styles.title__button}>
                    <h1>Питомцы</h1>
                    <Button color={'orange'} text={'Добавить питомца'} onClick={() => navigate('/new-pet')}
                            type={'primary'}/>
                </div>
            }
            {pets.length ?
                <div className={styles.cards}>
                    {
                        pets.map(pet =>
                            <PetCard size={'medium'} petInfo={pet} key={pet.id}
                                     url={`/pet?user-id=${user.userID}&pet-id=${pet.id}`}/>
                        )
                    }
                </div>
                :
                <>
                    <span className={styles.title}>У вас пока нет питомцев</span>
                    <div className={styles.text__button}>
                        <p>Если у вас уже есть питомец,<br/> добавьте его описание на PetLand</p>
                        <Button color={'orange'} text={'Добавить питомца'}
                                onClick={() => navigate('/new-pet')} type={'primary'}/>
                    </div>
                    <div className={styles.text__button}>
                        <p>Или найдите друга<br/> в объявлениях PetLand</p>
                        <Button color={'green'} text={'Доска объявлений'}
                                onClick={() => navigate('/adverts')} type={'primary'}/>
                    </div>
                </>
            }
        </>
    );
};

export default Pets;
