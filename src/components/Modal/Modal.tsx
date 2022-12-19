import React, {useState} from "react";

import image from '../../static/dog_1.jpg';
import paw from '../../static/paw.svg';

import styles from './Modal.module.css';

const Modal: React.FC = () => {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <>
            <a onClick={() => {setIsOpened(true)}}>Open modal</a>
            {isOpened && <div className={styles.wrapper}>
                <div className={styles.overlay} onClick={() => {setIsOpened(false)}}></div>
                <div className={styles.modal}>
                    <img src={image} alt={"dog"}/>
                    <div className={styles.form}>
                        <h1>Авторизация</h1>
                        <input type={"text"}/>
                        <input type={"text"}/>
                        <a>Забыли пароль?</a>
                        <button>Войти</button>
                        <p className={"subtext"}>У вас ещё нет аккаунта?</p>
                        <button>Зарегистрироваться</button>
                        <img className={styles.paw} src={paw} alt={"лапа"}/>
                        <p className={"text"}>При регистрации и входе вы подтверждаете согласие с условиями использования PetLand и политикой обработки данных.</p>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Modal;
