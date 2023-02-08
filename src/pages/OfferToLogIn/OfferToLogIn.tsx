import React, {useState} from 'react';

import cat from './img/cat.png'

import styles from './OfferToLogIn.module.css'
import sadDog from "../Page404/img/sadDog.png";
import userIcon from "../../components/Header/img/user.svg";
import Authorization from "../../components/Authorization/Authorization";
import Modal from "../../components/Modal/Modal";

const OfferToLogIn: React.FC = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [formSignIn, setFormSignIn] = useState(true);

    return (
        <div className={styles.wrapper}>
            <img src={cat} alt='Собака' className={styles.cat}/>
            <div className={styles.text__block}>
                <p className={styles.text}>Это доступно только <br/> для авторизованных пользователей</p>
                <p className={styles.text}>
                    <Modal
                    button={
                        <a className={styles.ref}>Войдите</a>
                    }
                    content={Authorization}
                    contentProps={{isMobile}}
                /> или <Modal
                        button={
                            <a className={styles.ref}>зарегистрируйтесь</a>
                        }
                        content={Authorization}
                        contentProps={{isMobile}}
                    />
                    <br/> для полного доступа к функционалу PetLand</p>

            </div>
        </div>
    );
}

export default OfferToLogIn;

