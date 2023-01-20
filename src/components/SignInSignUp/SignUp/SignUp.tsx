import React, {useEffect, useState} from "react";
import cn from "classnames";

import {iAuthProps} from "../Auth";
import userService from "../../../services/userService";

import Image from "../../Image/Image";
import Input from "../../UIKit/Input";
import Button from "../../UIKit/Button";
import Checkbox from "../../UIKit/Checkbox";

import {emailRegExp, nameRegExp, passwordRegExp} from "../../../constants/regularExpressions";

import image from "./img/dog_2.jpg";
import errorIcon from "../../../static/error_icon.svg";

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
    const [verificationCodeFromBackend, setVerificationCodeFromBackend] = useState('123456');

    const [responseCode, setResponseCode] = useState(0);

    const [counter, setCounter] = useState(0);

    const getEnding = (num: number): string => {
        if (num % 100 >= 10 && num % 100 < 20 || num % 10 === 0 || num % 10 > 4) {
            return "";
        }
        if (num % 10 === 1) {
            return "у";
        }
        return "ы";
    }

    useEffect(() => {
        const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
        return () => clearInterval(timer);
    }, [counter]);

    const sendCode = async () => {
        setWaitCode(true);
        setCounter(30);
        //get code from backend
        setVerificationCodeFromBackend(verificationCodeFromBackend == "654321" ? "123456" : "654321");
    }

    useEffect(() => {
        if (waitCode) {
            if (verificationCode.ok && verificationCode.value == verificationCodeFromBackend) {
                setEmailVerified(true);
            }
        }
    }, [verificationCode]);

    const sendForm = async () => {
        let isOk: boolean = true;
        const inputs = [
            {state: firstName, setState: setFirstName},
            {state: surName, setState: setSurName},
            {state: email, setState: setEmail},
            {state: password1, setState: setPassword1},
            {state: password2, setState: setPassword2}
        ];
        inputs.forEach(({state, setState}) => {
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

        await userService.register(firstName.value, surName.value, email.value, password1.value).then((response) => {
            //console.log(response);
            setResponseCode(response.status);
            if (response.ok) {
                // @ts-ignore
                document.getElementById("modal_overlay").click();
            } else {
                switch (response.status) {
                    case 500:
                        alert("Error 500");
                        break;
                    case 400:
                        alert("Wrong request data");
                        break;
                    case 409:
                        break;
                    default:
                        alert("Unknown error");
                        break;
                }
            }
            return response.json();
        }).then((body) => {
            //console.log(body);
        });
    }

    return (
        <div className={styles.modal}>
            <Image imageProps={{src: image, alt: "Собака", width: "475px", height: "630px"}}
                   borderRadius={"30px 0 0 30px"}/>
            <div className={styles.reg}>
                <h1>Регистрация</h1>
                <form id="registration_form" className={styles.form}>
                    <div className={styles.info__inputs}>
                        <Input type={"text"} width={"300px"} placeholder={"Имя"} value={firstName}
                               setValue={setFirstName} regularExpressions={nameRegExp} required={true}/>
                        <Input type={"text"} width={"300px"} placeholder={"Фамилия"} value={surName}
                               setValue={setSurName} regularExpressions={nameRegExp} required={true}/>
                        <Input type={"email"} width={"300px"} placeholder={"Email"} value={email} setValue={setEmail}
                               onChangeFn={() => {
                                   setEmailVerified(false)
                               }} regularExpressions={emailRegExp}
                               required={true} disabled={waitCode && counter != 0}/>
                        <div className={styles.email__confirm}>
                            <div className={styles.send__code}>
                                {emailVerified &&
                                    <p className={cn("success", styles.code__verified__msg)}>Email подтвержден</p>}
                                <Button color={"orange"} label={"Отправить код"} type={"transparent"} size={"small"}
                                        onClick={sendCode} disabled={!email.ok || waitCode && counter !== 0}/>
                                <p className={styles.resend__code}>{counter ? <>Подождите {counter} секунд{getEnding(counter)}</> : ""}</p>
                            </div>
                            <Input type={"text"} width={"130px"} placeholder={"Код"} value={verificationCode}
                                   setValue={setVerificationCode} regularExpressions={[]} required={false}
                                   disabled={emailVerified}/>
                        </div>
                        <div className={styles.password1}>
                            <Input type={"password"} width={"300px"} placeholder={"Придумайте пароль"} value={password1}
                                   setValue={setPassword1} regularExpressions={passwordRegExp} required={true}/>
                            {password1.value != password2.value && <div className={cn(styles.passwords__different)}>
                                <img src={errorIcon} title={"Пароли не совпадают"} alt={""}/>
                            </div>}
                        </div>
                        <Input type={"password"} width={"300px"} placeholder={"Повторите пароль"} value={password2}
                               setValue={setPassword2} regularExpressions={passwordRegExp} required={true}/>
                    </div>
                    <div style={{alignSelf: "flex-start", width: "350px", overflow: "visible"}}>
                        <Checkbox setChecked={setPolicyChecked}>Согласие с пользовательским соглашением</Checkbox>
                    </div>
                </form>
                <div className={styles.submit}>
                    {responseCode == 409 &&
                        <p className={"error"} style={{position: "absolute", top: "-16px", left: "2px"}}>Такой email уже
                            используется</p>}
                    <Button color={"orange"} label={"Создать аккаунт"} disabled={!policyChecked} size={"medium"}
                            type={"fill"} onClick={sendForm}/>
                    <p className={"subtext"}>
                        У вас уже есть аккаунт?
                        <a className={"subtext link"} onClick={switchContent}>Войти</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
