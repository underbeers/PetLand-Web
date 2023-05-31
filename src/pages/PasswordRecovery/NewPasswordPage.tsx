import React, {useState} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import cn from 'classnames';

import {passwordRegExp} from '../../constants/regularExpressions';
import {useIsMobileContext} from '../../contexts/isMobileContext';
import UserService from '../../services/userService';

import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';

import styles from './NewPasswordPage.module.css';


const NewPasswordPage = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [password1, setPassword1] = useState(initialInputState);
    const [password2, setPassword2] = useState(initialInputState);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const isMobile = useIsMobileContext();

    const [searchParams] = useSearchParams();

    const saveNewPassword = async () => {
        await UserService.sendNewPassword({
            newPassword: password1.value,
            hashID: searchParams.get('id') || ''
        }).then(response => {
            switch (response.status) {
                case 200:
                    setPasswordChanged(true);
                    break;
                default:
                    alert(`Неизвестная ошибка, код ${response.status}`)
            }
        });
    };

    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    };

    return (
        <div className={styles.window}>
            {!passwordChanged ?
                <>
                    {!isMobile ? <h1>Восстановление пароля</h1> : <h3>Восстановление пароля</h3>}
                    <div className={styles.inputs}>
                        <Input type={'password'} placeholder={'Придумайте пароль'} value={password1}
                               regularExpressions={passwordRegExp} setValue={setPassword1} required={true}/>
                        <Input type={'password'} placeholder={'Повторите пароль'} value={password2}
                               regularExpressions={passwordRegExp} setValue={setPassword2} required={true}/>
                        {password1.value != password2.value &&
                            <p className={cn('secondary__text-1', styles.error)}>
                                Пароли не совпадают
                            </p>
                        }
                    </div>
                    <Button type={'primary'} color={'orange'} text={'Сохранить пароль'} onClick={saveNewPassword}
                            className={styles.button} disabled={!password1.ok || !password2.ok}/>
                </>
                :
                <>
                    {!isMobile ?
                        <h1 className={styles.success__message}>Пароль успешно обновлен</h1>
                        :
                        <h3 className={styles.success__message}>Пароль успешно обновлен</h3>
                    }
                    <Button type={'primary'} color={'green'} text={'На главную PetLand'} onClick={routeChange}
                            className={styles.main__page}/>
                </>
            }
        </div>
    );
};

export default NewPasswordPage;
