import React, {useState} from "react";

import styles from './SignIn.module.css';
import Image from "../../../Image/Image";

import dogPhoto from './img/dog.jpg';
import Input from "../../../UIKit/Input";
import Checkbox from "../../../UIKit/Checkbox";
import Button from "../../../UIKit/Button";
import {iAuthProps} from "../../AuthDesktop";
import {emailRegExp, passwordRegExp} from "../../../../constants/regularExpressions";

const SignIn: React.FC<iAuthProps> = ({switchContent, closeModal}) => {

    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState)
    const [savePwd, setSavePwd] = useState(false)

    const login = () => {

    }

    return (
            <div className={styles.modal}>
                <span className={styles.cross} onClick={closeModal}></span>
                <Image imageProps={{src: dogPhoto, alt: 'Собака', width: '100%', height: '230px'}} />

                <div className={styles.auth}>

                    <h1>Авторизация</h1>

                    <div className={styles.form}>

                        <Input
                            type={"email"}
                            placeholder={"Email"}
                            value={email}
                            regularExpressions={emailRegExp}
                            setValue={setEmail}
                            required={true}
                            width={'260px'}
                        />
                        <Input
                            type={"password"}
                            placeholder={"Пароль"}
                            value={password}
                            regularExpressions={passwordRegExp}
                            setValue={setPassword}
                            required={true}
                            width={'260px'}
                        />

                        <a className={'subtext'} href={'#'} style={{textDecoration: 'underline', alignSelf: "flex-end"}}>Забыли пароль?</a>

                        <div >
                            <Checkbox setChecked={setSavePwd}>Не выходить из аккаунта</Checkbox>
                        </div>

                    </div>


                        <div className={styles.button__and__reg}>
                            <Button color={'orange'} label={'Войти'} onClick={login} size={'small'} type={'fill'}/>
                            <p style={{textAlign: "center", paddingTop: '8px'}}>
                                У вас уже есть аккаунт?<br/>
                                <a className={'link'} onClick={switchContent}>Зарегистрироваться</a>
                            </p>
                        </div>
                </div>
            </div>
    );
};

export default SignIn;
