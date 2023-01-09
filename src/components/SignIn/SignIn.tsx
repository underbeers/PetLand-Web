import React from "react";

import image from "./img/dog_1.jpg";
import paw from "../../static/paw.svg";

import Input from "../UIKit/Input";
import Button from "../UIKit/Button";

import styles from './SignIn.module.css';
import cn from "classnames";
import Modal, {iModalContentProps} from "../Modal/Modal";
import SignUp from "../SignUp/SignUp";

const SignIn: React.FC<iModalContentProps> = ({close}) => {

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.form}>
                <h1 className={styles.heading}>Авторизация</h1>
                <div className={styles.inputs}>
                    <Input type={"text"} width={"273px"} placeholder={"Логин или почта"}/>
                    <div className={styles.pwd__block}>
                        <Input type={"password"} width={"273px"} placeholder={"Пароль"}/>
                        <a className={"subtext"} href={"#"} style={{textDecoration: "underline"}}>Забыли пароль?</a>
                    </div>
                    <div><Button color={"orange"} label={"Войти"} onClick={()=>{}} size={"medium"} type={"fill"}/></div>
                </div>
                <p className={cn("subtext", styles.forgot__pwd)}>У вас ещё нет аккаунта?</p>
                <Modal
                    button={
                        <Button color={"green"} label={"Зарегистрироваться"} onClick={close} size={"small"} type={"transparent"}/>
                    }
                    content={SignUp}
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

export default SignIn;
