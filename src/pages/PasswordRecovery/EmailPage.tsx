import React, {useState} from 'react';

import Input from '../../components/UIKit/Input';
import Button from '../../components/UIKit/Button';

import styles from './EmailPage.module.css';


const EmailPage = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [email, setEmail] = useState(initialInputState);
    const [emailSent, setEmailSent] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    const send = () => {
        setEmailSent(true);
    }

    /*
    const send = async () => {

        await userService.askPasswordRecovery(email.value).then(response => {
            console.log(response.status);
        });
    }
*/
    return (
        <div className={styles.window}>

            {!emailSent ?
                <>
                    <h1>Восстановление пароля</h1>
                    <Input type={'email'} value={email} setValue={setEmail} className={styles.input__email}
                           label={'Email'} help={'На почту придет ссылка для сброса пароля'}/>
                    <div className={styles.buttons}>
                        <Button type={'primary'} color={'orange'} text={'Сбросить пароль'} onClick={send}
                                className={styles.button1}/>
                        <Button type={'secondary'} color={'orange'} text={'Вернуться к авторизации'} onClick={() => {
                        }} className={styles.button2}/>
                    </div>
                </>
                :
                <>
                    {!isMobile ?
                    <>
                        <h1 style={{color: 'var(--orange--primary--color)'}} className={styles.check}>Проверьте почту</h1>
                        <h3 className={styles.desc}>Ссылка для обновления пароля <br /> отправлена на указанный email</h3>
                    </>
                        :
                        <>
                            <h3 style={{color: 'var(--orange--primary--color)'}} className={styles.check}>Проверьте почту</h3>
                            <h5 className={styles.desc}>Ссылка для обновления пароля <br /> отправлена на указанный email</h5>
                        </>
                    }

                </>
            }

        </div>
    )

}

export default EmailPage;
