import React from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import cn from 'classnames';

import styles from './Dialog.module.css';


export type DialogProps = {
    id: string;
    message: string;
    user: string;
    time: string;
    connected: boolean;
};

const Dialog: React.FC<DialogProps> = ({id, message, user, time, connected}) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chat = searchParams.get('chat') || null;
    const navigate = useNavigate();

    const prettyTime = new Date(time);


    return (
        <div onClick={() => navigate(`/messenger?chat=${id}`)}
             className={cn(styles.card, chat == id ? styles.active : '')}>
            <div className={connected ? styles.photo__wrapper : ''}>
                <img className={styles.photo}
                     src={'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                     alt={'user'}/>
            </div>
            <div className={styles.info}>
                <div className={styles.name__n__time}>
                    <h5 className={styles.name}>
                        {user}
                    </h5>
                    <p className={cn('secondary__text-2', styles.time)}>
                        {prettyTime.toTimeString().substring(0, 5)}
                    </p>
                </div>
                <p className={cn('secondary__text-2', styles.last__message)}>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default Dialog;
