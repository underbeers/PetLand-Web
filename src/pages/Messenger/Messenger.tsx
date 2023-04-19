import React, {useContext} from "react";
import {useSearchParams} from "react-router-dom";

import {withOfferToSignIn} from "../../hoc/withOfferToSignIn";
import {UserContext} from "../../userContext";

import Chat from "../../components/Messenger/Chat/Chat";

import styles from './Messenger.module.css';
import Dialogs from "../../components/Messenger/Dialogs/Dialogs";


const Messenger: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chat = searchParams.get('chat');

    return (
        <div className={styles.chat__window}>
            <div className={styles.header}>
                <h1>Чаты</h1>
            </div>
            <div className={styles.chat__wrapper}>
                <div className={styles.dialogs}>
                    <Dialogs chatID={chat}/>
                </div>
                <div className={styles.dialog}>
                    {chat ?
                        <Chat chatID={chat}/>
                        :
                        <>Здесь будут ваши сообщения</>
                    }
                </div>
            </div>
        </div>);
};

export default withOfferToSignIn(Messenger);
