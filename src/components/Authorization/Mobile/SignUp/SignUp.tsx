import React, {useEffect, useState} from "react";

import styles from './SignUp.module.css';

import Input from "../../../UIKit/Input";
import Button from "../../../UIKit/Button";
import Image from "../../../Image/Image";

import dogPhoto from './img/dog.png';
import Checkbox from "../../../UIKit/Checkbox";
import {iAuthProps} from "../../AuthDesktop";
import {emailRegExp, nameRegExp, passwordRegExp} from "../../../../constants/regularExpressions";

const SignUp: React.FC<iAuthProps> = ({switchContent, closeModal}) => {

    const initialInputState = {value: '', ok: false, edited: false};

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

    const [stage, setStage] = useState(1);

    useEffect(() => {
        const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
        return () => clearInterval(timer);
    }, [counter]);

    useEffect(() => {
        if (waitCode) {
            if (verificationCode.ok && verificationCode.value == verificationCodeFromBackend) {
                setEmailVerified(true);
            }
        }
    }, [verificationCode]);

    return (
        <div className={styles.modal}>

            {(stage === 2 || stage === 3) &&
                <div className={styles.wrapper__arrow} onClick={() => setStage(stage - 1)}><span
                    className={styles.arrow}/></div>}

            <span className={styles.cross} onClick={closeModal}/>
            <Image imageProps={{src: dogPhoto, alt: 'Собака', width: '100%', height: '230px'}} />

            <div className={styles.auth}>

                <h1>Регистрация</h1>

                <div className={styles.form} style={{display: stage === 1 ? "flex" : "none"}}>
                    <Input
                        type={"text"}
                        placeholder={"Имя"}
                        value={firstName}
                        regularExpressions={nameRegExp}
                        setValue={setFirstName}
                        required={true}
                        width={'260px'}
                    />

                    <Input
                        type={"text"}
                        placeholder={"Фамилия"}
                        value={surName}
                        regularExpressions={nameRegExp}
                        setValue={setSurName}
                        required={true}
                        width={'260px'}
                    />
                </div>
                <div className={styles.form} style={{display: stage === 2 ? "flex" : "none"}}>
                    <Input
                        type={"text"}
                        placeholder={"Email"}
                        value={email}
                        regularExpressions={emailRegExp}
                        setValue={setEmail}
                        required={true}
                        width={'260px'}
                    />

                    <Button
                        color={'orange'}
                        label={'Отправить код'}
                        onClick={() => {
                            setStage(stage + 1)
                        }}
                        size={'small'}
                        type={'transparent'}/>

                    <Input
                        type={"text"}
                        placeholder={"Код"}
                        value={verificationCode}
                        regularExpressions={[]}
                        setValue={setVerificationCode}
                        required={true}
                        width={'260px'}
                    />
                </div>
                <div className={styles.form} style={{display: stage === 3 ? "flex" : "none"}}>
                    <Input
                        type={"password"}
                        placeholder={"Пароль"}
                        value={password1}
                        regularExpressions={passwordRegExp}
                        setValue={setPassword1}
                        required={true}
                        width={'260px'}
                    />

                    <Input
                        type={"password"}
                        placeholder={"Повторите пароль"}
                        value={password2}
                        regularExpressions={passwordRegExp}
                        setValue={setPassword2}
                        required={true}
                        width={'260px'}
                    />


                    <a className={'subtext'} href={'#'} style={{textDecoration: 'underline', alignSelf: "flex-end"}}>Забыли
                        пароль?</a>

                    <div>
                        <Checkbox setChecked={setPolicyChecked}>Согласие с пользовательским <br/> соглашением</Checkbox>
                    </div>
                </div>


                <div className={styles.button__and__signin}>

                    <Button
                        color={'orange'}
                        label={stage === 3 ? 'Создать аккаунт' : 'Следующий шаг'}
                        onClick={stage === 3 ? () => () => {
                        } : () => {
                            setStage(stage + 1)
                        }}
                        size={'small'}
                        type={'fill'}
                        disabled={((stage === 1) ?
                            (!firstName.ok || !surName.ok) :
                                (stage === 2) ?
                                    (!email.ok || !verificationCode.ok) :
                                        (stage === 3) ?
                                            (!password1.ok || !password2.ok || !policyChecked) :
                                            false) }
                    />

                    <p style={{textAlign: "center", paddingTop: '8px'}}>
                        У вас уже есть аккаунт? <br/>
                        <a className={'link'} onClick={switchContent}>Войти</a>
                    </p>

                </div>
            </div>

        </div>
    );
};
export default SignUp;