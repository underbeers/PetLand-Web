import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

import userService from '../../services/userService';
import {useIsMobileContext} from '../../contexts/isMobileContext';

import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';
import Authorization from '../../components/Authorization/Authorization';
import Modal from '../../components/Modal/Modal';

import styles from './EmailPage.module.css';


const EmailPage = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [emailSent, setEmailSent] = useState(false);
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();

    const send = async () => {
        await userService.askPasswordRecovery({email: email.value}).then(response => {
            switch (response.status) {
                case 200:
                    setEmailSent(true);
                    break;
                default:
                    alert(`Неизвестная ошибка, код ${response.status}`)
            }
        });
    };

    return (
        <div className={styles.window}>
            {!emailSent ?
                <>
                    {!isMobile ? <h1>Восстановление пароля</h1> : <h3>Восстановление пароля</h3>}
                    <Input type={'email'} value={email} setValue={setEmail} className={styles.input__email}
                           label={'Email'} help={'На почту придет ссылка для сброса пароля'}/>
                    <div className={styles.buttons}>
                        <Button type={'primary'} color={'orange'} text={'Сбросить пароль'} onClick={send}
                                className={styles.button1} disabled={!email.ok}/>
                        <Modal
                            button={<Button type={'secondary'} color={'orange'} text={'Вернуться к авторизации'}
                                            onClick={() => {
                                            }} className={styles.button2}/>}
                            content={Authorization}
                            contentProps={{isFormSignIn: true}}/>
                    </div>
                </>
                :
                <>
                    {!isMobile ?
                        <>
                            <h1 style={{color: 'var(--orange--primary--color)'}} className={styles.check}>Проверьте
                                почту</h1>
                            <h3 className={styles.desc}>Ссылка для обновления пароля <br/> отправлена на указанный email
                            </h3>
                        </>
                        :
                        <>
                            <h3 style={{color: 'var(--orange--primary--color)'}} className={styles.check}>Проверьте
                                почту</h3>
                            <h5 className={styles.desc}>Ссылка для обновления пароля <br/> отправлена на указанный email
                            </h5>
                        </>
                    }
                </>
            }
        </div>
    );
};

export default EmailPage;
