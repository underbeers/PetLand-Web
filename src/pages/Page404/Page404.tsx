import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';

import sadDog from './img/sadDog.png';

import styles from './Page404.module.css'


const Page404: React.FC = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>PetLand</h5>
                </TopBar>}
            <div className={styles.wrapper}>
                <div className={styles.error__dog}>
                    <div className={styles.error__desc}>
                        <span className={styles.error}>404</span>
                        <h1 className={styles.description}>Страница, которую вы<br/> искали, не найдена</h1>
                    </div>
                    <img src={sadDog} alt='Собака' className={styles.dog}/>
                </div>
                <Button color={'orange'} text={'Перейти на главную'} onClick={routeChange} type={'primary'}/>
            </div>
        </>
    );
};

export default Page404;
