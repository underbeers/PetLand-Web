import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';

import {passwordRegExp} from '../../constants/regularExpressions';
import userService from '../../services/userService';

import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';

import styles from './NewPasswordPage.module.css';


const NewPasswordPage = () => {

    const [searchParams] = useSearchParams();


    const initialInputState = {value: '', ok: false, edited: false};
    const [password1, setPassword1] = useState(initialInputState);
    const [password2, setPassword2] = useState(initialInputState);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const saveNewPassword = async () => {
        await userService.sendNewPassword({newPassword: password1.value, profileId: searchParams.get('id') || ''}).then(response => {
            switch (response.status) {
                case 200:
                    setPasswordChanged(true);
                    break;
                default:
                    alert(`Неизвестная ошибка, код ${response.status}`)
            }
        });
    }

    let navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    }

    return (
        <div className={styles.window}>
            {!passwordChanged ?
                <>
                    {!isMobile ? <h1>Восстановление пароля</h1> : <h3>Восстановление пароля</h3>}
                    <div className={styles.inputs}>

                        <Input type={'password'} placeholder={'Придумайте пароль'} value={password1}
                               setValue={setPassword1} regularExpressions={passwordRegExp} required={true}/>
                        <Input type={'password'} placeholder={'Повторите пароль'} value={password2}
                               regularExpressions={[{
                                   regExp: RegExp('^' + password1.value + '$'),
                                   error: 'Пароли не совпадают'
                               }].concat(passwordRegExp)}
                               setValue={setPassword2} required={true} className={styles.input__password2}/>
                    </div>
                    <Button type={'primary'} color={'orange'} text={'Сохранить пароль'} onClick={saveNewPassword}
                            className={styles.button} disabled={!password1.ok || !password2.ok}/>
                </>
                :
                <>
                    {!isMobile ? <h1 className={styles.success__message}>Пароль успешно обновлен</h1> :
                        <h3 className={styles.success__message}>Пароль успешно обновлен</h3>}
                    <Button type={'primary'} color={'green'} text={'На главную PetLand'} onClick={routeChange} className={styles.main__page}/>
                </>
            }
        </div>
    )
}

export default NewPasswordPage;
