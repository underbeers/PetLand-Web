import React, {useState} from 'react';

import Authorization from '../../components/Authorization/Authorization';
import Modal from '../../components/Modal/Modal';

import cat from './img/cat.png'

import styles from './OfferToSignIn.module.css'


const OfferToSignIn: React.FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.text__block}><img src={cat} alt='Собака' className={styles.cat}/></div>
            <div className={styles.text__block}>
                <h1 className={styles.text}>Это доступно только <br/> для авторизованных пользователей</h1>
                <h1 className={styles.text}>
                    <Modal
                        button={<span className={styles.ref}>Войдите</span>}
                        content={Authorization}
                        contentProps={{isMobile, isFormSignIn: true}}/>
                    &nbsp;или&nbsp;
                    <Modal
                        button={<span className={styles.ref}>зарегистрируйтесь</span>}
                        content={Authorization}
                        contentProps={{isMobile, isFormSignIn: false}}/>
                    <br/>
                    для полного доступа к функционалу PetLand
                </h1>
            </div>
        </div>
    );
};

export default OfferToSignIn;
