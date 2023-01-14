import React, {useState} from "react";
import cn from "classnames";

import {iAuthProps} from "../Auth";

import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";

import paw from "../../../static/paw.svg";

import image from "./img/dog_1.jpg";

import styles from './SignIn.module.css';
import Checkbox from "../../UIKit/Checkbox";

const SignIn: React.FC<iAuthProps> = ({switchContent}) => {
    const initialInputState = {value: "", ok: false, edited: false};

    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState);
    const [savePwd, setSavePwd] = useState(false);

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.auth}>
                <h1 className={styles.heading}>Авторизация</h1>
                <div className={styles.form}>
                    <div className={styles.inputs}>
                        <Input type={"text"} width={"273px"} placeholder={"Почта"} value={email} setValue={setEmail} regExp={RegExp(/^.+@\w+\.\w+$/)} required={true}/>
                        <div className={styles.pwd__block}>
                            <Input type={"password"} width={"273px"} placeholder={"Пароль"} value={password} setValue={setPassword} regExp={RegExp(/^[A-Za-z0-9-+!?.,@$#()]{6,15}$/)} required={true}/>
                            <a className={"subtext"} href={"#"} style={{textDecoration: "underline"}}>Забыли пароль?</a>
                        </div>
                        <div style={{alignSelf: "flex-start"}}><Checkbox setChecked={setSavePwd}>Не выходить из аккаунта</Checkbox></div>
                    </div>
                    <div><Button color={"orange"} label={"Войти"} onClick={() => {}} size={"medium"} type={"fill"}/></div>
                    <p className={cn("subtext", styles.forgot__pwd)}>У вас ещё нет аккаунта? <a className={"subtext link"} onClick={()=>switchContent()}>Зарегистрироваться</a></p>
                </div>
                <div className={styles.paw__block}>
                    <span className={styles.paw}><img src={paw} alt={"Лапка"}/></span>
                    <p className={"text"}>
                        При входе вы подтверждаете согласие с условиями<br/>
                        использования PetLand и политикой обработки данных.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
