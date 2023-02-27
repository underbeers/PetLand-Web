import React, {useContext, useEffect, useState} from 'react';
import cn from 'classnames';

import {UserContext} from '../../../userContext';
import {iAuthProps} from '../Authorization';
import {emailRegExp, nameRegExp, passwordRegExp} from '../../../constants/regularExpressions';
import userService from '../../../services/userService';

import Input from '../../UIKit/Input';
import Button from '../../UIKit/Button';
import Checkbox from '../../UIKit/Checkbox';
import Icons from "../../UIKit/Icons";

import Image from '../../Image/Image';

import dogDesktop from './img/dog_desktop.jpg';
import dogMobile from './img/dog_mobile.jpg';

import generalStyles from '../Authorization.module.css';
import styles from './SignUp.module.css';


const SignUp: React.FC<iAuthProps> = ({switchContent, closeModal, isMobile}) => {
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
    const [verificationCodeFromBackend, setVerificationCodeFromBackend] = useState('      ');

    const [responseCode, setResponseCode] = useState(0);
    const [counter, setCounter] = useState(0);

    const [stage, setStage] = useState(1);

    const {user, setUser} = useContext(UserContext);

    const getEnding = (num: number): string => {
        if (num % 100 >= 10 && num % 100 < 20 || num % 10 === 0 || num % 10 > 4) {
            return '';
        }
        if (num % 10 === 1) {
            return 'у';
        }
        return 'ы';
    }

    useEffect(() => {
        const timer = counter > 0 ? setInterval(() => setCounter(counter - 1), 1000) : 0;
        return () => clearInterval(timer);
    }, [counter]);

    const genCode: () => string = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    const sendCode = async () => {
        setWaitCode(true);
        setEmailVerified(false);
        setCounter(30);
        const code = genCode();
        setVerificationCodeFromBackend(code);
        await userService.sendCode(email.value, code);
    }

    useEffect(() => {
        if (waitCode) {
            if (verificationCode.ok && verificationCode.value == verificationCodeFromBackend) {
                setEmailVerified(true);
            }
        }
    }, [verificationCode]);

    const isNextStageDisabled = (): boolean => {
        switch (stage) {
            case 1:
                return !firstName.ok || !surName.ok;
            case 2:
                return !email.ok || !emailVerified || !verificationCode.ok;
            case 3:
                return !password1.ok || !password2.ok || !policyChecked;
            default:
                return false;
        }
    }

    const register = async () => {
        document.querySelectorAll('#registration_form input').forEach(el => {
            // @ts-ignore
            el.focus();
        });

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

        await userService.signUp(firstName.value, surName.value, email.value, password1.value,
            setResponseCode, () => {
                userService.signIn(email.value, password1.value, false, setResponseCode, user, setUser, closeModal)
            });
    }

    return (!isMobile ?
            <div className={generalStyles.modal}>
                <span className={generalStyles.cross} onClick={closeModal}/>
                <Image imageProps={{src: dogDesktop, alt: '', width: '475px', height: '630px'}}
                       borderRadius={'30px 0 0 30px'}
                       className={generalStyles.image}/>
                <div className={generalStyles.form__wrapper}>
                    <h1>Регистрация</h1>
                    <form id='registration_form' className={generalStyles.form}>
                        <div className={generalStyles.inputs} style={{gap: 24}}>
                            <Input type={'text'} placeholder={'Имя'} value={firstName}
                                   setValue={setFirstName} regularExpressions={nameRegExp} required={true}/>
                            <Input type={'text'} placeholder={'Фамилия'} value={surName}
                                   setValue={setSurName} regularExpressions={nameRegExp} required={true}/>
                            <Input type={'email'} placeholder={'Email'} value={email}
                                   regularExpressions={emailRegExp} required={true} disabled={waitCode && counter != 0}
                                   setValue={setEmail} onChangeFn={() => {setEmailVerified(false)}}/>
                            <div className={styles.email__confirm}>
                                <div className={styles.send__code}>
                                    {emailVerified &&
                                        <p className={cn('success', styles.code__verified__msg)}>Email подтвержден</p>
                                    }
                                    <Button color={'orange'} text={'Отправить код'} type={'secondary'}
                                            onClick={sendCode} disabled={!email.ok || waitCode && counter !== 0}/>
                                    <p className={styles.resend__code}>
                                        {counter ? <>Подождите {counter} секунд{getEnding(counter)}</> : ''}
                                    </p>
                                </div>
                                <Input type={'text'} placeholder={'Код'} value={verificationCode}
                                       setValue={setVerificationCode} disabled={emailVerified} required={true}
                                       regularExpressions={[]}/>
                            </div>
                            <div className={styles.password1}>
                                <Input type={'password'}placeholder={'Придумайте пароль'}
                                       value={password1}
                                       setValue={setPassword1} regularExpressions={passwordRegExp} required={true}/>
                            </div>
                            <Input type={'password'} placeholder={'Повторите пароль'} value={password2}
                                   regularExpressions={[{
                                       regExp: RegExp('^' + password1.value + '$'),
                                       error: 'Пароли не совпадают'
                                   }].concat(passwordRegExp)}
                                   setValue={setPassword2} required={true}/>
                        </div>
                        <div style={{alignSelf: 'flex-start', width: '350px', overflow: 'visible'}}>
                            <Checkbox setChecked={setPolicyChecked}>Согласие с пользовательским соглашением</Checkbox>
                        </div>
                        <div className={generalStyles.submit}>
                            {responseCode == 409 &&
                                <p className={'error'} style={{position: 'absolute', top: '-16px', left: '2px'}}>
                                    Такой email уже используется
                                </p>
                            }
                            <Button color={'orange'} text={'Создать аккаунт'} disabled={!policyChecked}
                                    type={'primary'} onClick={register}/>
                            <p className={'subtext'}>
                                У вас уже есть аккаунт?&nbsp;
                                <a className={'subtext link'} onClick={switchContent}>Войти</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div> :
            <div className={generalStyles.modal}>
                {(stage === 2 || stage === 3) &&
                    <span className={generalStyles.arrow} onClick={() => setStage(stage - 1)}></span>
                }
                <span className={generalStyles.cross} onClick={closeModal}/>
                <Image className={generalStyles.image}
                       imageProps={{src: dogMobile, alt: 'Собака', width: '100%', height: '230px'}}/>
                <div className={generalStyles.form__wrapper}>
                    <h1>Регистрация</h1>
                    <div className={generalStyles.form} style={{display: stage === 1 ? 'flex' : 'none'}}>
                        <Input type={'text'} placeholder={'Имя'} value={firstName} regularExpressions={nameRegExp}
                               setValue={setFirstName} required={true}/>
                        <Input type={'text'} placeholder={'Фамилия'} value={surName} regularExpressions={nameRegExp}
                               setValue={setSurName} required={true}/>
                    </div>
                    <div className={generalStyles.form} style={{display: stage === 2 ? 'flex' : 'none'}}>
                        <p className={styles.resend__code}>
                            {counter ? <>Подождите {counter} секунд{getEnding(counter)}</> : ''}
                        </p>
                        <Input type={'email'} placeholder={'Email'} value={email} regularExpressions={emailRegExp}
                               setValue={setEmail} required={true} disabled={waitCode && counter != 0}
                               onChangeFn={() => {setEmailVerified(false)}}/>
                        <Button color={'orange'} text={'Отправить код'} onClick={sendCode}
                                type={'secondary'} disabled={!email.ok || waitCode && counter !== 0}/>

                        <Input type={'number'} placeholder={'Код'} value={verificationCode} regularExpressions={[]}
                               setValue={setVerificationCode} required={true} disabled={emailVerified}/>
                        {emailVerified &&
                            <p className={cn('success', styles.code__verified__msg)}>Email подтвержден</p>
                        }
                    </div>
                    <div className={generalStyles.form} style={{display: stage === 3 ? 'flex' : 'none'}}>
                        <Input type={'password'} placeholder={'Пароль'} regularExpressions={passwordRegExp}
                               value={password1} setValue={setPassword1} required={true}/>
                        <Input type={'password'} placeholder={'Повторите пароль'} value={password2}
                               regularExpressions={[{
                                   regExp: RegExp('^' + password1.value + '$'),
                                   error: 'Пароли не совпадают'
                               }].concat(passwordRegExp)}
                               required={true} setValue={setPassword2}/>
                        <a className={'subtext link'} href={'#'} style={{alignSelf: 'flex-end'}}>
                            Забыли пароль?</a>
                        <Checkbox setChecked={setPolicyChecked}>Согласие с пользовательским<br/>соглашением</Checkbox>
                    </div>
                    <div className={generalStyles.button__and__switch__content}>
                        <Button color={'orange'} text={stage === 3 ? 'Создать аккаунт' : 'Следующий шаг'}
                                onClick={stage === 3 ? register : () => {setStage(stage + 1)}}
                                type={'primary'} disabled={isNextStageDisabled()}/>
                        <span className={generalStyles.paw}><Icons icon={"paw"}/></span>
                        <p className={'subtext'}>
                            У вас уже есть аккаунт? <br/>
                            <a className={'link'} onClick={switchContent}>Войти</a>
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default SignUp;
