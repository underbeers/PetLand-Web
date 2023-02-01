import React, {useContext, useState} from "react";

import styles from './SignIn.module.css';
import Image from "../../../Image/Image";

import dogPhoto from './img/dog.jpg';
import Input from "../../../UIKit/Input";
import Checkbox from "../../../UIKit/Checkbox";
import Button from "../../../UIKit/Button";
import {iAuthProps} from "../../AuthDesktop";
import {emailRegExp, passwordRegExp} from "../../../../constants/regularExpressions";
import {UserContext} from "../../../../userContext";
import userService from "../../../../services/userService";


const SignIn: React.FC<iAuthProps> = ({switchContent, closeModal}) => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState);
    const [savePwd, setSavePwd] = useState(false);
    const [responseCode, setResponseCode] = useState(0);

    const {user, setUser} = useContext(UserContext);

    const login = async () => {
        // @ts-ignore
        document.querySelectorAll('#login_form input').forEach((el)=> {el.focus()});

        let isOk: boolean = true;

        const inputs = [
            {state: email, setState: setEmail},
            {state: password, setState: setPassword},
        ];
        inputs.forEach(({state, setState}) => {
            setState({edited: true, ok: state.ok, value: state.value});
            if (!state.ok) {
                isOk = false;
            }
        });
        if (!isOk) {
            return;
        }

        await userService.authenticate(email.value, password.value).then(response => {
            //console.log(response.status);
            setResponseCode(response.status);
            if (response.ok) {
                //console.log('Authenticated');
                return response.json();
            } else {
                switch (response.status) {
                    case 500:
                        alert('Возникла техническая ошибка');
                        break;
                    case 400:
                        //alert('Неверный логин или пароль');
                        break;
                    default:
                        alert(`Произошла неизвестная ошибка, код ${response.status}`);
                        break;
                }
                return null;
            }
        }).then(body => {
            //console.log(body);
            body && localStorage.setItem('accessToken', body.accessToken);
            return body;
        }).then((body)=>{
            body && userService.authorize().then(response => {
                //console.log(response.status);
                setResponseCode(response.status);
                if (response.ok) {
                    //console.log('Authorized');
                    return response.json();
                } else {
                    switch (response.status) {
                        default:
                            alert(`Неизвестная ошибка, код ${response.status}`);
                            break;
                    }
                    return null;
                }
            }).then(body => {
                //console.log(body);
                body && setUser(body);
                body && closeModal && closeModal();
            });
        });
    };

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
                            {responseCode == 400 &&
                                <p className={'error'}>
                                    Неверный логин или пароль
                                </p>
                            }
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
