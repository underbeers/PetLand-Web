import React, {useContext, useState} from 'react';
import cn from 'classnames';

import {iAuthProps} from '../Authorization';
import {UserContext} from '../../../userContext';
import {emailRegExp, passwordRegExp} from '../../../constants/regularExpressions';
import userService from '../../../services/userService';

import Input from '../../UIKit/Input';
import Button from '../../UIKit/Button';
import Checkbox from '../../UIKit/Checkbox';
import Icons from '../../UIKit/Icons';

import Image from '../../Image/Image';

import dogDesktop from './img/dog_desktop.jpg';
import dogMobile from './img/dog_mobile.jpg';

import generalStyles from '../Authorization.module.css';
import styles from './SignIn.module.css';


const SignIn: React.FC<iAuthProps> = ({switchContent, closeModal, isMobile}) => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [password, setPassword] = useState(initialInputState);
    const [savePwd, setSavePwd] = useState(false);
    const [responseCode, setResponseCode] = useState(0);

    const {user, setUser} = useContext(UserContext);

    const login = async () => {
        document.querySelectorAll('#login_form input').forEach((el) => {
            // @ts-ignore
            el.focus();
        });

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
        await userService.signIn(email.value, password.value, savePwd, setResponseCode, user, setUser, closeModal);
    };

    return (!isMobile ?
            <div className={generalStyles.modal}>
                <Icons icon={'cross'} className={generalStyles.cross} onClick={closeModal}/>

                <Image imageProps={{src: dogDesktop, alt: 'Собака', width: '475px', height: '630px'}}
                       borderRadius={'32px 0 0 32px'}
                       className={generalStyles.image}/>
                <div className={generalStyles.form__wrapper}>
                    <h2>Авторизация</h2>
                    <form id='login_form' className={generalStyles.form}>
                        <div className={generalStyles.inputs}>
                            <Input type={'text'} placeholder={'Email'} value={email} setValue={setEmail}
                                   regularExpressions={emailRegExp} required={true}/>
                            <div className={styles.pwd__block}>
                                <Input type={'password'} placeholder={'Пароль'} value={password}
                                       setValue={setPassword} regularExpressions={passwordRegExp} required={true}/>
                                <a className={cn('primary__text underlined', styles.forgot__pwd)}
                                   href={'/password-recovery'}>
                                    Забыли пароль?
                                </a>
                            </div>
                            <div style={{alignSelf: 'flex-start'}}>
                                <Checkbox isChecked={savePwd} setChecked={setSavePwd}>Не выходить из аккаунта</Checkbox>
                            </div>
                        </div>
                        <div className={generalStyles.submit}>
                            {responseCode == 400 &&
                                <p className={'error'}>
                                    Неверный логин или пароль
                                </p>
                            }
                            <Button color={'orange'} text={'Войти'} onClick={login} type={'primary'}/>
                        </div>
                        <p className={cn('secondary__text-1', generalStyles.switch__content)}>
                            У вас ещё нет аккаунта?
                            <a className={'underlined'} onClick={switchContent}>Зарегистрироваться</a>
                        </p>
                    </form>
                    <div className={generalStyles.paw__block}>
                        <span className={generalStyles.paw}><Icons icon={'paw'}/></span>
                        <p className={'secondary__text-2'}>
                            При входе вы подтверждаете согласие с условиями<br/>
                            использования PetLand и политикой обработки данных.
                        </p>
                    </div>
                </div>
            </div> :
            <div className={generalStyles.modal}>
                <Icons icon={"cross"} className={generalStyles.cross} onClick={closeModal} />
                <Image imageProps={{src: dogMobile, alt: 'Собака', width: '100%', height: '230px'}}
                       className={generalStyles.image}/>
                <div className={generalStyles.form__wrapper}>
                    <h3>Авторизация</h3>
                    <div className={generalStyles.form}>
                        <Input
                            type={'email'}
                            placeholder={'Email'}
                            value={email}
                            regularExpressions={emailRegExp}
                            setValue={setEmail}
                            required={true}
                        />
                        <Input
                            type={'password'}
                            placeholder={'Пароль'}
                            value={password}
                            regularExpressions={passwordRegExp}
                            setValue={setPassword}
                            required={true}
                        />
                        <a className={cn('secondary__text-1', 'underlined', styles.forgot__pwd__mobile)} href={'/password-recovery'}>Забыли пароль?</a>
                        <div style={{alignSelf: 'flex-start'}}>
                            <Checkbox isChecked={savePwd} setChecked={setSavePwd}>Не выходить из аккаунта</Checkbox>
                        </div>
                    </div>
                    <div className={generalStyles.button__and__switch__content}>
                        {responseCode == 400 &&
                            <p className={'error'}>
                                Неверный логин или пароль
                            </p>
                        }
                        <Button color={'orange'} text={'Войти'} onClick={login} type={'primary'}/>

                        <p className={cn('primary__text', styles.sub__color)}>
                            У вас ещё нет аккаунта?<br/>
                            <a className={cn('primary__text', 'underlined')} onClick={switchContent}>Зарегистрироваться</a>
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default SignIn;
