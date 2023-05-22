import React, {useContext, useEffect, useState} from 'react';
import cn from 'classnames';

import {useUserContext} from '../../../contexts/userContext';
import {iAuthProps} from '../Authorization';
import {emailRegExp, nameRegExp, passwordRegExp} from '../../../constants/regularExpressions';
import userService from '../../../services/userService';

import Input from '../../UIKit/Input';
import Button from '../../UIKit/Button';
import Checkbox from '../../UIKit/Checkbox';
import Icons from '../../UIKit/Icons';

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

    const {user, setUser} = useUserContext();

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
        await userService.sendCode({email: email.value, code});
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

    const focusForm = () => {
        document.querySelectorAll('#registration_form input').forEach(el => {
            // @ts-ignore
            el.focus();
        });
    }

    const register = async () => {
        focusForm();

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

    const firstLastName = <>
        <Input type={'text'} placeholder={'Имя'} value={firstName} setValue={setFirstName}
               regularExpressions={nameRegExp} required={true}/>
        <Input type={'text'} placeholder={'Фамилия'} value={surName} setValue={setSurName}
               regularExpressions={nameRegExp} required={true}/>
    </>;

    const emailInput = <>
        <Input type={'email'} placeholder={'Email'} value={email}
               regularExpressions={emailRegExp} required={true} disabled={waitCode && counter != 0}
               setValue={setEmail} onChangeFn={() => {
            setEmailVerified(false)
        }}/>
    </>;
    const sendCodeBtn = <>
        <Button color={'green'} type={'secondary'}
                text={`Отправить код${counter ? `(${counter})` : ''}`}
                onClick={sendCode} disabled={!email.ok || waitCode && counter !== 0}/>
    </>;
    const codeInput = <>
        <Input type={'number'} placeholder={'Код'} value={verificationCode} required={true}
               setValue={setVerificationCode} disabled={emailVerified} regularExpressions={[]}
               className={styles.code__input}
               help={emailVerified ? 'Email подтвержден' : 'Введите код'}/>
    </>;

    const passwords = <>
        <Input type={'password'} placeholder={'Придумайте пароль'} value={password1} regularExpressions={passwordRegExp}
               setValue={setPassword1} required={true}/>
        <Input type={'password'} placeholder={'Повторите пароль'} value={password2} regularExpressions={passwordRegExp}
               setValue={setPassword2} required={true}/>
    </>;

    return (!isMobile ?
            <div className={generalStyles.modal}>
                <Icons icon={'cross'} className={generalStyles.cross} onClick={closeModal}/>
                <Image imageProps={{src: dogDesktop, alt: '', width: '475px', height: '630px'}}
                       borderRadius={'32px 0 0 32px'}
                       className={generalStyles.image}/>
                <div className={generalStyles.form__wrapper}>
                    <h2>Регистрация</h2>
                    <form id='registration_form' className={generalStyles.form}>
                        {firstLastName}
                        {emailInput}
                        <div className={styles.email__confirm}>
                            {sendCodeBtn}
                            {codeInput}
                        </div>
                        {passwords}
                        <Checkbox isChecked={policyChecked} setChecked={setPolicyChecked}>
                            Согласие с пользовательским соглашением
                        </Checkbox>
                    </form>
                    <div className={styles.submit}>
                        {password1.value == password2.value ? responseCode == 409 &&
                            <p className={cn('secondary__text-1', generalStyles.error)}>
                                Такой email уже используется
                            </p>
                            :
                            <p className={cn('secondary__text-1', generalStyles.error)}>
                                Пароли не совпадают
                            </p>}
                        <Button color={'orange'} text={'Создать аккаунт'} type={'primary'} onClick={register}
                                disabled={!policyChecked || !password1.ok || !password2.ok} loading={user.loading}/>
                        <p className={cn('secondary__text-1', generalStyles.switch__content)}>
                            У вас уже есть аккаунт?&nbsp;
                            <a className={'underlined'} onClick={switchContent}>Войти</a>
                        </p>
                    </div>
                </div>
            </div>
            :
            <div className={generalStyles.modal}>
                {(stage === 2 || stage === 3) &&
                    <Icons icon={'arrow-left'} onClick={() => setStage(stage - 1)} className={styles.arrow}/>
                }
                <Icons icon={'cross'} className={generalStyles.cross} onClick={closeModal}/>
                <Image className={generalStyles.image}
                       imageProps={{src: dogMobile, alt: 'Собака', width: '100%', height: '230px'}}/>
                <div className={generalStyles.form__wrapper}>
                    <h3>Регистрация</h3>
                    <div className={generalStyles.form} style={{display: stage === 1 ? 'flex' : 'none'}}>
                        {firstLastName}
                    </div>
                    <div className={generalStyles.form} style={{display: stage === 2 ? 'flex' : 'none'}}>
                        {emailInput}
                        {sendCodeBtn}
                        {codeInput}
                    </div>
                    <div className={generalStyles.form} style={{display: stage === 3 ? 'flex' : 'none'}}>
                        {passwords}
                        <Checkbox isChecked={policyChecked} setChecked={setPolicyChecked}>
                            Согласие с условиями сервиса
                        </Checkbox>
                    </div>
                    <div className={generalStyles.button__and__switch__content}>
                        {password1.value == password2.value ? responseCode == 409 &&
                            <p className={cn('secondary__text-1', generalStyles.error)}>
                                Такой email уже используется
                            </p>
                            :
                            <p className={cn('secondary__text-1', generalStyles.error)}>
                                Пароли не совпадают
                            </p>
                        }
                        <Button color={'orange'} text={stage === 3 ? 'Создать аккаунт' : 'Следующий шаг'}
                                onClick={stage === 3 ? register : () => {
                                    setStage(stage + 1)
                                }}
                                type={stage === 3 ? 'primary' : 'secondary'} disabled={isNextStageDisabled()}
                                loading={user.loading}/>
                        <p className={cn('primary__text', styles.sub__color)}>
                            У вас уже есть аккаунт? <br/>
                            <a className={cn('underlined', 'primary__text')} onClick={switchContent}>Войти</a>
                        </p>
                    </div>
                </div>
            </div>
    );
};

export default SignUp;
