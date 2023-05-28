import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';

import {ChatUserType, useChatContext} from '../../contexts/chatContext';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';
import {useIsMobileContext} from '../../contexts/isMobileContext';

import TopBar from '../../components/TopBar/TopBar';
import Chat from '../../components/Messenger/Chat/Chat';
import Dialogs from '../../components/Messenger/Dialogs/Dialogs';
import Icons from '../../components/UIKit/Icons';

import styles from './Messenger.module.css';


export const ChatPlug = () =>
    <div className={styles.empty__chat}>
        <Icons icon={'chat-plus-outline'} className={styles.chat__plus__icon}/>
        <h3>Напишите владельцу питомца, чтобы начать общаться</h3>
    </div>;

const Messenger: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const chat = useChatContext();
    const chatID = searchParams.get('chat');
    const isMobile = useIsMobileContext();

    const getUser: () => ChatUserType = () => {
        for (let i = 0; i < chat.users.length; i++) {
            if (chat.users[i].userID == chatID) {
                return chat.users[i];
            }
        }
        return {userID: '', connected: false, hasNewMessage: true, username: '', messages: []};
    }
    const [user2, setUser2] = useState<ChatUserType>(getUser());

    useEffect(() => {
        setUser2(getUser());
    }, [chat, chatID]);

    if (isMobile) {
        return (
            <>
                <TopBar className={styles.top__bar} leftButton={chatID ? 'arrow' : 'burger'}>
                    {!chatID ?
                        <h5>Чаты</h5>
                        :
                        <>
                            {user2.userID != chat.userID && <img
                                className={styles.user__photo}
                                src={'https://apronhub.in/wp-content/uploads/2022/01/team14-scaled.jpg'}
                                alt={'user'}/>}
                            <div className={styles.user__name}>
                                <h5>{user2.userID == chat.userID ? 'Избранное' : user2.username}</h5>
                                <p className={'secondary__text-2'}>{user2.userID != chat.userID && (user2.connected ? 'Онлайн' : 'Оффлайн')}</p>
                            </div>
                        </>
                    }
                </TopBar>
                <div className={styles.chat__mobile__background}>
                    {chatID ?
                        <Chat chatID={chatID} user2={user2} setUser2={setUser2} getUser={getUser}/>
                        :
                        <Dialogs chatID={chatID}/>
                    }
                </div>
            </>
        );
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.chat__window}>
                <div className={styles.header}>
                    <h1>Чаты</h1>
                </div>
                <div className={styles.chat__wrapper}>
                    <div className={styles.dialogs}>
                        <Dialogs chatID={chatID}/>
                    </div>
                    <div className={styles.dialog}>
                        {chatID ?
                            <Chat chatID={chatID} user2={user2} setUser2={setUser2} getUser={getUser}/>
                            :
                            <ChatPlug/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withOfferToSignIn(Messenger);
