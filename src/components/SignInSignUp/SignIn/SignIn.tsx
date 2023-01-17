import React, {useState} from "react";
import cn from "classnames";

import {iAuthProps} from "../Auth";

import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";
import Checkbox from "../../UIKit/Checkbox";

import {emailRegExp, passwordRegExp} from "../../../constants/regularExpressions";

import paw from "../../../static/paw.svg";
import image from "./img/dog_1.jpg";

import styles from './SignIn.module.css';

const SignIn: React.FC<iAuthProps> = ({switchContent}) => {
    const initialInputState = {value: "", ok: false, edited: false};

    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState);
    const [savePwd, setSavePwd] = useState(false);

    const login = () => {

    }

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.auth}>
                <h1 className={styles.heading}>Авторизация</h1>
                <div className={styles.form}>
                    <div className={styles.inputs}>
                        <Input type={"text"} width={"273px"} placeholder={"Email"} value={email} setValue={setEmail}
                               regularExpressions={emailRegExp} required={true}/>
                        <div className={styles.pwd__block}>
                            <Input type={"password"} width={"273px"} placeholder={"Пароль"} value={password}
                                   setValue={setPassword} regularExpressions={passwordRegExp} required={true}/>
                            <a className={"subtext"} href={"#"} style={{textDecoration: "underline"}}>Забыли пароль?</a>
                        </div>
                        <div style={{alignSelf: "flex-start"}}><Checkbox setChecked={setSavePwd}>Не выходить из
                            аккаунта</Checkbox></div>
                    </div>
                    <div><Button color={"orange"} label={"Войти"} onClick={login} size={"medium"} type={"fill"}/></div>
                    <p className={cn("subtext", styles.forgot__pwd)}>У вас ещё нет аккаунта? <a
                        className={"subtext link"} onClick={switchContent}>Зарегистрироваться</a></p>
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
