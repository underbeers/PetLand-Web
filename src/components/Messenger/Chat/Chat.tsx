import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {useUserContext} from "../../../userContext";
import chatService, {ChatUserType} from "../../../services/chatService";

import Button from "../../UIKit/Button";
import Icons from "../../UIKit/Icons";
import Bubble from "../Bubble/Bubble";

import styles from './Chat.module.css';
import {useChatContext} from "../../../chatContext";


const Chat: React.FC<{ chatID: string }> = ({chatID}) => {
    const {user, setUser} = useUserContext();
    const {users, setUsers} = useChatContext();
    const [message, setMessage] = useState('');

    const getUser: () => ChatUserType = () => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].userID == chatID) {
                return users[i];
            }
        }
        console.log('user not found');
        return {userID: '', connected: false, username: '', messages: []};
    }
    const [user2, setUser2] = useState(getUser());

    useEffect(()=>{
        setUser2(getUser());
    },[users, chatID]);

    const sendMessage = () => {
        if (chatID && message) {
            const user2 = getUser();
            if (user2.userID == '') {
                console.log('error sending message');
                return;
            }
            chatService.socket.emit('private message', {content: message, to: user2.userID});
            users.forEach((user_) => {
                if (user_.userID == user2.userID) {
                    user_.messages.push({content: message, from: user.chatID, to: user2.userID});
                }
            });
            setUsers(users);
            setMessage('');
        }
    }

    return (
        <div className={styles.wrapper}>
            {chatID ?
                <>
                    <div className={styles.info}>
                        <div className={styles.user}>
                            <img
                                src={'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                                alt={'user'}/>
                            <div className={styles.name}>
                                <h5>{user2.username}</h5>
                                <p className={'secondary__text-2'}>{user2.connected ? 'Онлайн' : 'Оффлайн'}</p>
                            </div>
                        </div>
                        <Button type={"secondary"} color={"orange"} text={'Передать питомца'} onClick={() => {
                        }}/>
                    </div>
                    <div className={styles.chat}>
                        {user2.messages.map((message, index) => {
                            const time = new Date('2023-04-26T20:37:31+00:00');
                            return <Bubble
                                key={index}
                                type={message.to == user2.userID ? 'my' : 'alien'}
                                text={message.content}
                                time={time.toTimeString().substring(0, 5)}/>
                        }).reverse()}
                    </div>
                    <div className={styles.message}>
                <textarea
                    onKeyDown={(event) => {
                        if (event.key == 'Enter') {
                            if (event.shiftKey) {
                            } else {
                                event.preventDefault()
                                sendMessage();
                            }
                        }
                    }}
                    value={message}
                    onChange={event => {
                        event.preventDefault();
                        setMessage(event.target.value);
                    }}
                    className={styles.textarea} placeholder={'Напишите сообщение...'}/>
                        <Icons className={styles.send} icon={"send"} onClick={sendMessage}/>
                    </div>
                </>
                :
                <>
                    Ваши сообщения появятся тут
                </>}
        </div>
    );
};

export default Chat;
