import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import {ChatUserType, useChatContext} from '../../../chatContext';
import {useUserContext} from '../../../userContext';

import Button from '../../UIKit/Button';
import Icons from '../../UIKit/Icons';

import Bubble from '../Bubble/Bubble';

import styles from './Chat.module.css';
import cn from "classnames";


const Chat: React.FC<{ chatID: string }> = ({chatID}) => {
    const navigate = useNavigate();
    const {user, setUser} = useUserContext();
    const chat = useChatContext();
    const [message, setMessage] = useState('');

    useEffect(() => {
        function handleKeyDown(e: any) {
            if (e.key == 'Escape') {
                navigate('/messenger');
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
        }
    }, []);

    const getUser: () => ChatUserType = () => {
        for (let i = 0; i < chat.users.length; i++) {
            if (chat.users[i].userID == chatID) {
                return chat.users[i];
            }
        }
        return {userID: '', connected: false, hasNewMessage: true, username: '', messages: []};
    }
    const [user2, setUser2] = useState(getUser());

    useEffect(() => {
        setUser2(getUser());
    }, [chat, chatID]);

    const sendMessage = () => {
        if (chatID && message) {
            const user2 = getUser();
            if (user2.userID == '') {
                console.log('error sending message');
                return;
            }
            const socket = chat.socket;
            // @ts-ignore
            socket.userID = user.chatUserID;
            socket.emit('private message', {content: message, to: user2.userID});
            setMessage('');
        }
    }

    const prettyTime = (time: Date) => time.toJSON().substring(0, 10).split('-').reverse().join('.');
    let prevDate = new Date();

    return (
        <div className={styles.wrapper}>
            {chatID ?
                <>
                    <div className={styles.info}>
                        <div className={styles.user}>
                            {user2.userID != chat.userID && <img
                                src={'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                                alt={'user'}/>}
                            <div className={styles.name}>
                                <h5>{user2.userID == chat.userID ? 'Избранное' : user2.username}</h5>
                                <p className={'secondary__text-2'}>{user2.userID != chat.userID && (user2.connected ? 'Онлайн' : 'Оффлайн')}</p>
                            </div>
                        </div>
                        {user2.userID != chat.userID &&
                            <Button type={'secondary'} color={'orange'} text={'Передать питомца'} onClick={() => {
                            }}/>
                        }
                    </div>
                    <div className={styles.chat}>
                        {user2.messages.map((message, index) => {
                            const time = new Date(message.time);
                            const printDate = prettyTime(time) != prettyTime(prevDate);
                            const key = index + 1;
                            prevDate = time;
                            return <Bubble
                                key={index}
                                type={message.to == user2.userID ? 'my' : 'alien'}
                                text={message.content}
                                time={time.toTimeString().substring(0, 5)}
                                printDate={printDate}
                                date={prettyTime(time)}
                            />
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
                        <Icons className={styles.send} icon={'send'} onClick={sendMessage}/>
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
