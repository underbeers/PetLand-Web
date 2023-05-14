import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import cn from 'classnames';

import styles from './Dialog.module.css';
import {useUserContext} from "../../../userContext";


export type DialogProps = {
    id: string;
    message: string;
    username: string;
    time: string;
    connected: boolean;
    hasNewMessage: boolean;
};

const Dialog: React.FC<DialogProps> = ({id, message, username, time, connected, hasNewMessage}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chat = searchParams.get('chat') || null;
    const navigate = useNavigate();
    const {user, setUser} = useUserContext();

    const prettyTime = new Date(time);

    return (
        <div onClick={() => navigate(`/messenger?chat=${id}`)}
             className={cn(styles.card, chat == id ? styles.active : '')}>
            <div className={connected ? styles.photo__wrapper : ''}>
                <img className={styles.photo}
                     src={id == user.chatUserID ? user.photo : 'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                     alt={'user'}/>
            </div>
            <div className={styles.info}>
                <div className={styles.name__n__time}>
                    <h5 className={styles.name}>
                        {username}
                    </h5>
                    <p className={cn('secondary__text-2', styles.time)}>
                        {prettyTime.toTimeString().substring(0, 5)}
                    </p>
                </div>
                <div className={styles.name__n__time}>
                    <p className={cn('secondary__text-2', styles.last__message)}>
                        {message}
                    </p>
                    {hasNewMessage && <p className={styles.has__new__message}/>}
                </div>
            </div>
        </div>
    );
};

export default Dialog;
