import React, {useContext, useEffect, useState} from "react";
import {useSearchParams} from "react-router-dom";

import {UserContext} from "../../../userContext";
import chatService from "../../../services/chatService";

import Button from "../../UIKit/Button";
import Icons from "../../UIKit/Icons";
import Bubble from "../Bubble/Bubble";

import styles from './Chat.module.css';


const Chat: React.FC<{chatID: string}> = ({chatID}) => {
    const {user, setUser} = useContext(UserContext);
    const [searchParams, setSearchParams] = useSearchParams();
    type MessagesType = {
        success: boolean;
        conversation: Array<{
            chatRoomId: string;
            createdAt: string;
            message: {
                messageText: string;
            };
            postedByUser: {
                firstName: string;
                lastName: string;
                type: string;
                updatedAt: string;
                __v: number;
                _id: string;
            };
            readByRecipients: Array<{
                readAt: string;
                readByUserId: string;
            }>;
        }>;
        users: Array<{
            _id: string;
            firstName: string;
            lastName: string;
            type: string;
            createdAt: string;
            updatedAt: string;
            __v: number;
        }>;
    };

    const [messages, setMessages] = useState<MessagesType>();

    useEffect(() => {
        if (chatID && user.chatAccessToken) {
            chatService.loadMessages(user, chatID, setMessages);
        }
    }, [chatID, user.chatAccessToken]);

    const getUserFullName = (m: MessagesType) => {
        const u = m.users.filter(m => m._id != user.chatID)[0];
        return u.firstName + ' ' + u.lastName;
    }

    const [message, setMessage] = useState('');
    const sendMessage = () => {
        if (message && chatID) {
            chatService.sendMessage(user, chatID, message);
            setMessage('');
        }
    };


    return (
        <div className={styles.wrapper}>
            {chatID && messages ?
                <>
                    <div className={styles.info}>
                        <div className={styles.user}>
                            <img
                                src={'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                                alt={'user'}/>
                            <div className={styles.name}>
                                <h5>{getUserFullName(messages)}</h5>
                                <p className={'secondary__text-2'}>Онлайн</p>
                            </div>
                        </div>
                        <Button type={"secondary"} color={"orange"} text={'Передать питомца'} onClick={() => {
                        }}/>
                    </div>
                    <div className={styles.chat}>
                        {messages.conversation.map(message => {
                            const time = new Date(message.createdAt);
                            return <Bubble
                                key={message.createdAt}
                                type={message.postedByUser._id == user.chatID ? 'my' : 'alien'}
                                text={message.message.messageText}
                                time={time.toTimeString().substring(0, 5)}/>
                        })}
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
