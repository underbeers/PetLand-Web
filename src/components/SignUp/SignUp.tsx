import React from "react";

import paw from "../../static/paw.svg";

import Input from "../UIKit/Input";
import Button from "../UIKit/Button";

import image from "../SignUp/img/dog_2.jpg";
import person from "../SignUp/img/person.svg";
import mail from "../SignUp/img/mail.svg";
import personInfo from "../SignUp/img/person_info.svg";

import styles from './SignUp.module.css';
import cn from "classnames";
import Modal, {iModalContentProps} from "../Modal/Modal";
import SignIn from "../SignIn/SignIn";

const SignUp: React.FC<iModalContentProps> = ({close}) => {

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.form}>
                <h1 className={styles.heading}>Регистрация</h1>
                <div className={styles.user__info}>
                    <div className={styles.info__block}>
                        <img className={styles.info__icon} src={person} alt={"Публичная информация"}/>
                        <div className={styles.info__inputs}>
                            <Input type={"text"} width={"273px"} placeholder={"Имя*"}/>
                            <Input type={"text"} width={"273px"} placeholder={"Фамилия*"}/>
                        </div>
                    </div>
                    <span className={styles.divider}></span>
                    <div className={styles.info__block}>
                        <img className={styles.info__icon} src={mail} alt={"Контактная информация"}/>
                        <div className={styles.info__inputs}>
                            <Input type={"email"} width={"273px"} placeholder={"Email*"}/>
                            <Input type={"phone"} width={"273px"} placeholder={"Номер телефона"}/>
                        </div>
                    </div>
                    <span className={styles.divider}></span>
                    <div className={styles.info__block}>
                        <img className={styles.info__icon} src={personInfo} alt={"Приватная информация"}/>
                        <div className={styles.info__inputs}>
                            <Input type={"text"} width={"273px"} placeholder={"Придумайте логин*"}/>
                            <Input type={"password"} width={"273px"} placeholder={"Придумайте пароль*"}/>
                            <Input type={"password"} width={"273px"} placeholder={"Придумайте пароль*"}/>
                        </div>
                    </div>
                </div>

                <Button color={"orange"} label={"Создать аккаунт"} onClick={() => {}} size={"medium"} type={"fill"}/>

                <p className={cn("subtext", styles.already__reg)}>У вас уже есть аккаунт?</p>
                <Modal
                    button={
                        <Button color={"green"} label={"Войти"} onClick={close} size={"small"} type={"transparent"}/>
                    }
                    content={SignIn}
                />
                <span className={styles.paw}><img src={paw} alt={"Лапка"}/></span>
                <p className={"text"}>
                    При регистрации и входе вы подтверждаете согласие<br/>
                    с условиями использования PetLand<br/>
                    и политикой обработки данных.
                </p>
            </div>
        </div>
    );
};

export default SignUp;
