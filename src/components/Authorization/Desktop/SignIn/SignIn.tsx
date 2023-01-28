import React, {useContext, useState} from 'react';
import cn from 'classnames';

import {iAuthProps} from '../../AuthDesktop';
import userService from '../../../../services/userService';
import {iUser, UserContext} from "../../../../userContext";
import {emailRegExp, passwordRegExp} from '../../../../constants/regularExpressions';

import Input from '../../../UIKit/Input';
import Button from '../../../UIKit/Button';
import Checkbox from '../../../UIKit/Checkbox';

import Image from '../../../Image/Image';

import paw from '../../../../static/paw.svg';
import image from './img/dog_1.jpg';
import cross from '../../../../static/cross.svg';

import styles from './SignIn.module.css';


const SignIn: React.FC<iAuthProps> = ({switchContent, closeModal}) => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState);
    const [savePwd, setSavePwd] = useState(false);
    const [responseCode, setResponseCode] = useState(0);

    // @ts-ignore
    const [user, setUser]: [iUser | null, (user: iUser | null)=>void] = useContext(UserContext);

    const login = async () => {
        // @ts-ignore
        document.querySelectorAll('#login_form input').forEach(el => {el.focus()});

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
            <Image imageProps={{src: image, alt: 'Собака', width:'475px', height: '630px'}}
                   borderRadius={'30px 0 0 30px'}/>
            <div className={styles.auth}>
                <h1 className={styles.heading}>Авторизация</h1>
                <form id="login_form" className={styles.form}>
                    <div className={styles.inputs}>
                        <Input type={'text'} width={'273px'} placeholder={'Email'} value={email} setValue={setEmail}
                               regularExpressions={emailRegExp} required={true}/>
                        <div className={styles.pwd__block}>
                            <Input type={'password'} width={'273px'} placeholder={'Пароль'} value={password}
                                   setValue={setPassword} regularExpressions={passwordRegExp} required={true}/>
                            <a className={'subtext'} href={'#'} style={{textDecoration: 'underline'}}>Забыли пароль?</a>
                        </div>
                        <div style={{alignSelf: 'flex-start'}}>
                            <Checkbox setChecked={setSavePwd}>Не выходить из аккаунта</Checkbox>
                        </div>
                    </div>
                    <div>
                        {responseCode == 400 &&
                            <p className={'error'}>
                                Неверный логин или пароль
                            </p>
                        }
                        <Button color={'orange'} label={'Войти'} onClick={login} size={'medium'} type={'fill'}/>
                    </div>
                    <p className={cn('subtext', styles.forgot__pwd)}>
                        У вас ещё нет аккаунта?&nbsp;
                        <a className={'subtext link'} onClick={switchContent}>Зарегистрироваться</a>
                    </p>
                </form>
                <div className={styles.paw__block}>
                    <span className={styles.paw}><img src={paw} alt={'Лапка'}/></span>
                    <p className={'text'}>
                        При входе вы подтверждаете согласие с условиями<br/>
                        использования PetLand и политикой обработки данных.
                    </p>
                </div>
            </div>
            <img src={cross} alt={'Закрыть'} title={'Закрыть'} onClick={closeModal} className={styles.cross}/>
        </div>
    );
};

export default SignIn;
