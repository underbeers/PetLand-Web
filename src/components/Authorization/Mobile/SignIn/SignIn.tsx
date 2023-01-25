import React from "react";

import styles from './SignIn.module.css';
import Image from "../../../Image/Image";

import dogPhoto from './img/dog.jpg';
import Input from "../../../UIKit/Input";
import Checkbox from "../../../UIKit/Checkbox";
import Button from "../../../UIKit/Button";

const SignIn: React.FC = () => {

    return (
        <>
            <div className={styles.modal}>
                <span className={styles.cross}></span>
                <Image imageProps={{src: dogPhoto, alt: 'Собака', width: '100%', height: ''}} />

                <div className={styles.auth}>

                    <h1>Авторизация</h1>

                    <div className={styles.form}>

                        <Input
                            type={"email"}
                            placeholder={"Email"}
                            value={{value: "", ok: true, edited: false}}
                            regularExpressions={[]}
                            setValue={() => {}}
                            required={true}
                            width={'260px'}
                        />
                        <Input
                            type={"password"}
                            placeholder={"Пароль"}
                            value={{value: "", ok: true, edited: false}}
                            regularExpressions={[]}
                            setValue={() => {}}
                            required={true}
                            width={'260px'}
                        />

                        <a className={'subtext'} href={'#'} style={{textDecoration: 'underline', alignSelf: "flex-end"}}>Забыли пароль?</a>

                        <div >
                            <Checkbox setChecked={() => {}}>Не выходить из аккаунта</Checkbox>
                        </div>

                    </div>


                        <div className={styles.button__and__reg}>
                            <Button color={'orange'} label={'Войти'} onClick={() => {}} size={'small'} type={'fill'}/>
                            <p style={{textAlign: "center", paddingTop: '8px'}}>
                                У вас уже есть аккаунт?<br/>
                                <a className={'link'}>Зарегистрироваться</a>
                            </p>
                        </div>
                </div>
            </div>

        </>
    );
};

export default SignIn;
