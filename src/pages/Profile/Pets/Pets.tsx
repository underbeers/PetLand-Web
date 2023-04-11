import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../../../components/UIKit/Button';
import Icons from '../../../components/UIKit/Icons';
import PetCard from '../../../components/PetCard/PetCard';
import TopBar from '../../../components/TopBar/TopBar';

import styles from './Pets.module.css';


const Pets: React.FC = () => {
    const [isEmpty, setIsEmpty] = useState(false);

    const navigate = useNavigate();

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (!isEmpty ?
            <div>
                {isMobile ?
                    <TopBar leftButton={'burger'}>
                        <h5>Мои питомцы</h5>
                        <Icons icon={'plus-circle-outline'} />
                    </TopBar> :
                    <div className={styles.title__button}>
                        <h1>Мои питомцы</h1>
                        <Button color={'orange'} text={'Добавить питомца'} onClick={()=>navigate('/new-pet')} type={'primary'}/>
                    </div>
                }
                <div className={styles.cards}>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                    <PetCard size={'medium'}/>
                </div>
            </div>
            :
            <div>
                {isMobile ?
                    <TopBar leftButton={'burger'}>
                        <h5>Мои питомцы</h5>
                        <Icons icon={'plus-circle-outline'}/>
                    </TopBar> :
                    <div className={styles.title__button}>
                        <h1>Мои питомцы</h1>
                    </div>
                }
                <span className={styles.title}>У вас пока нет питомцев</span>
                <div className={styles.text__button}>
                    <p>Если у вас уже есть питомец,<br/> добавьте его описание на PetLand</p>
                    <Button color={'orange'} text={'Добавить питомца'} onClick={() => {}} type={'primary'}/>
                </div>
                <div className={styles.text__button}>
                    <p>Или найдите друга<br/> в объявлениях PetLand</p>
                    <Button color={'green'} text={'Доска объявлений'} onClick={() => {}} type={'primary'}/>
                </div>
            </div>
    );
}

export default Pets;
