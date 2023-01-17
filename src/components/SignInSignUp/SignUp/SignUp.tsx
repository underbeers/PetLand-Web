import React, {useEffect, useState} from "react";
import cn from "classnames";

import {iAuthProps} from "../Auth";
import userService from "../../../services/userService";

import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";
import Checkbox from "../../UIKit/Checkbox";

import {emailRegExp, nameRegExp, passwordRegExp} from "../../../constants/regularExpressions";

import image from "./img/dog_2.jpg";

import styles from './SignUp.module.css';



const SignUp: React.FC<iAuthProps> = ({switchContent}) => {

    const initialInputState = {value: "", ok: false, edited: false};

    const [firstName, setFirstName] = useState(initialInputState);
    const [surName, setSurName] = useState(initialInputState);
    const [email, setEmail] = useState(initialInputState);
    const [verificationCode, setVerificationCode] = useState(initialInputState);
    const [password1, setPassword1] = useState(initialInputState);
    const [password2, setPassword2] = useState(initialInputState);

    const [policyChecked, setPolicyChecked] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [waitCode, setWaitCode] = useState(false);
    let verificationCodeFromBackend = '123456';

    const [state, setState] = useState({
        successful: false,
        message: ""
    });

    const [response, setResponse] = useState({});

    const sendCode = async () => {
        setWaitCode(true);
        //start timer
        //get code from backend
    }

    useEffect(() => {
        if (waitCode) {
            if (verificationCode.ok && verificationCode.value == verificationCodeFromBackend) {
                setEmailVerified(true);
                console.log("email verified");
            }
        }
    }, [verificationCode]);

    const sendForm = async () => {
        let isOk: boolean = true;
        [
            {state: firstName, setState: setFirstName},
            {state: surName, setState: setSurName},
            {state: email, setState: setEmail},
            {state: password1, setState: setPassword1},
            {state: password2, setState: setPassword2},].forEach(({state, setState}) => {
            setState({edited: true, ok: state.ok, value: state.value});
            if (!state.ok) {
                isOk = false;
            }
        });
        if (password1.value != password2.value) {
            return;
        }
        if (!isOk) {
            return;
        }
        console.log("account created");
        return;
        await userService.register(firstName.value, surName.value, email.value, password1.value).then(
            response => {
                setResponse(response);
                console.log(response);
                return response.text();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setState({
                    successful: false,
                    message: resMessage
                });

                console.log(state);
            }
        ).then((data) => console.log(data));
    }

    return (
        <div className={styles.modal}>
            <img src={image} alt={"Собака"}/>
            <div className={styles.reg}>
                <h1>Регистрация</h1>
                <div className={styles.form}>
                    <div className={styles.info__inputs}>
                        <Input type={"text"} width={"300px"} placeholder={"Имя"} value={firstName}
                               setValue={setFirstName} regularExpressions={nameRegExp} required={true}/>
                        <Input type={"text"} width={"300px"} placeholder={"Фамилия"} value={surName}
                               setValue={setSurName} regularExpressions={nameRegExp} required={true}/>
                        <Input type={"email"} width={"300px"} placeholder={"Email"} value={email} setValue={setEmail}
                               regularExpressions={emailRegExp} required={true} disabled={waitCode}/>
                        <div className={styles.email__confirm}>
                            <Button color={"orange"} label={"Отправить код"} type={"transparent"} size={"small"}
                                    onClick={sendCode} disabled={!email.ok || waitCode}/>
                            <Input type={"text"} width={"130px"} placeholder={"Код"} value={verificationCode}
                                   setValue={setVerificationCode} regularExpressions={[]} required={false}
                                   disabled={emailVerified}/>
                        </div>
                        <div className={styles.password1}>
                            <Input type={"password"} width={"300px"} placeholder={"Придумайте пароль"} value={password1}
                                   setValue={setPassword1} regularExpressions={passwordRegExp} required={true}/>
                            <span className={cn("subtext", styles.passwords__different)}>
                                {password1.value != password2.value && "Пароли не совпадают"}
                            </span>
                        </div>
                        <Input type={"password"} width={"300px"} placeholder={"Повторите пароль"} value={password2}
                               setValue={setPassword2} regularExpressions={passwordRegExp} required={true}/>
                    </div>
                    <div style={{alignSelf: "flex-start", width: 350, overflow: "visible"}}><Checkbox
                        setChecked={setPolicyChecked}>Согласие с пользовательским соглашением</Checkbox></div>
                </div>
                <div className={styles.submit}>
                    <Button color={"orange"} label={"Создать аккаунт"} disabled={!policyChecked} size={"medium"}
                            type={"fill"} onClick={sendForm}/>
                    <p className={"subtext"}>У вас уже есть аккаунт?
                        <a className={"subtext link"} onClick={switchContent}>Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
