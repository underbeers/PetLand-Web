import React, {useContext, useEffect} from "react";
import {useSearchParams} from "react-router-dom";

import {withOfferToSignIn} from "../../hoc/withOfferToSignIn";

import Chat from "../../components/Messenger/Chat/Chat";
import Dialogs from "../../components/Messenger/Dialogs/Dialogs";

import styles from './Messenger.module.css';
import chatService from "../../services/chatService";
import userService from "../../services/userService";
import {useUserContext} from "../../userContext";
import {useChatContext} from "../../chatContext";


const Messenger: React.FC = () => {
    const {user, setUser} = useUserContext();
    const {users, setUsers} = useChatContext();

    const [searchParams, setSearchParams] = useSearchParams();
    const chat = searchParams.get('chat');

    chatService.socket.on("session", ({ sessionID, userID }) => {
        console.log('session')
        chatService.socket.auth = { sessionID };
        if (user.accessToken) {
            userService.setChatID({chatID: sessionID}, user.accessToken);
        }
        // @ts-ignore
        chatService.socket.userID = userID;
    });

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
