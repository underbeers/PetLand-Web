import React from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../../components/UIKit/Button';

import sadDog from './img/sadDog.png';

import styles from './Page404.module.css'


const Page404: React.FC = () => {

    let navigate = useNavigate();
    const routeChange = () =>{
        let path = `/`;
        navigate(path);
    }


    return (
            <div className={styles.wrapper}>
        <div className={styles.error__dog}>
            <div className={styles.error__desc}>
                <span className={styles.error}>404</span>
                <p className={styles.description}>Страница, которую вы<br/> искали, не найдена</p>
            </div>
            <img src={sadDog} alt='Собака' className={styles.dog}/>
        </div>
        <Button color={'orange'} label={'Перейти на главную'} onClick={routeChange} size={'medium'} type={'fill'}/>
    </div>

    );
}

export default Page404;
