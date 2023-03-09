import React, {useState} from 'react';

import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';

import styles from './NewPasswordPage.module.css';


const NewPasswordPage = () => {

    const initialInputState = {value: '', ok: false, edited: false};
    const [password1, setPassword1] = useState(initialInputState);
    const [password2, setPassword2] = useState(initialInputState);
    const [passwordChanged, setPasswordChanged] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const saveNewPassword = () => {
        setPasswordChanged(true);
    }

    return (
        <div className={styles.window}>
            {!passwordChanged ?
                <>
                    {!isMobile ? <h1>Восстановление пароля</h1> : <h3>Восстановление пароля</h3>}
                    <div className={styles.inputs}>
                        <Input type={'password'} value={password1} setValue={setPassword1}
                               className={styles.input__password1} label={'Новый пароль'}/>
                        <Input type={'password'} value={password2} setValue={setPassword2}
                               className={styles.input__password2} label={'Подтверждение'}/>
                    </div>
                    <Button type={'primary'} color={'orange'} text={'Сохранить пароль'} onClick={saveNewPassword}
                            className={styles.button}/>
                </>
                :
                <>
                    {!isMobile ? <h1 className={styles.success__message}>Пароль успешно обновлен</h1> :
                        <h3 className={styles.success__message}>Пароль успешно обновлен</h3>}
                    <Button type={'primary'} color={'green'} text={'На главную PetLand'} onClick={() => {
                    }} className={styles.main__page}/>
                </>
            }
        </div>
    )
}

export default NewPasswordPage;
