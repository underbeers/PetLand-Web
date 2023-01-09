import React, {useState} from "react";
import cn from "classnames";

import {iAuthProps} from "../Auth";

import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";
import Checkbox from "../../UIKit/Checkbox";

import paw from "../../../static/paw.svg";

import image from "./img/dog_2.jpg";
import person from "./img/person.svg";
import mail from "./img/mail.svg";
import personInfo from "./img/person_info.svg";

import styles from './SignUp.module.css';


type State = {
    firstName: string,
    surName: string,
    email: string,
    mobilePhone: string,
    password: string,
    successful: boolean,
    message: string
};
const SignUp: React.FC<iAuthProps> = ({switchContent}) => {

    const [firstName, setFirstName] = useState("");
    const [surName, setSurName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [policyChecked, setPolicyChecked] = useState(false);

    const state: State = {
        firstName: "",
        surName: "",
        email: "",
        mobilePhone: "",
        password: "",
        successful: false,
        message: ""
    };

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.reg}>
                <h1>Регистрация</h1>
                <div className={styles.form}>
                    <div className={styles.info__inputs}>
                        <Input type={"text"} width={"300px"} placeholder={"Имя*"} setValue={setFirstName}/>
                        <Input type={"text"} width={"300px"} placeholder={"Фамилия*"} setValue={setSurName}/>
                    </div>
                    <div className={styles.info__inputs}>
                        <Input type={"email"} width={"300px"} placeholder={"Email*"} setValue={setEmail}/>
                        <Input type={"phone"} width={"300px"} placeholder={"Номер телефона"} setValue={setMobilePhone}/>
                    </div>
                    <div className={styles.info__inputs}>
                        <Input type={"password"} width={"300px"} placeholder={"Придумайте пароль*"} setValue={setPassword1}/>
                        <Input type={"password"} width={"300px"} placeholder={"Повторите пароль*"} setValue={setPassword2}/>
                    </div>
                    <div style={{alignSelf: "flex-start", width: 350, overflow: "visible"}}><Checkbox setChecked={setPolicyChecked}>Согласие с пользовательским соглашением</Checkbox></div>
                </div>
                <div className={styles.submit}>
                    <Button color={"orange"} label={"Создать аккаунт"} onClick={() => {}} size={"medium"} type={"fill"}/>
                    <p className={"subtext"}>У вас уже есть аккаунт? <a className={"subtext link"} onClick={() => switchContent()}>Войти</a></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
