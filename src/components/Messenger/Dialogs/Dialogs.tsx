import React from 'react';

import {useChatContext} from '../../../contexts/chatContext';
import {useUserContext} from '../../../contexts/userContext';

import Dialog from '../Dialog/Dialog';


const Dialogs: React.FC<{ chatID: string | null }> = ({chatID}) => {
    const chat = useChatContext();
    const {user, setUser} = useUserContext();

    // TODO: return only active dialogs or favorites
    const users = chat.users.sort((u2, u1) => {
        if (u1.messages.length && u2.messages.length) {
            return new Date(u1.messages[u1.messages.length - 1].time).getTime() -
                new Date(u2.messages[u2.messages.length - 1].time).getTime();
        }
        if (u1.messages.length) {
            return 1;
        }
        return -1;
    })//.filter(user => user.userID == chat.userID);

    return (
        <>
            {
                users.map((user_, index) =>
                    <Dialog
                        key={index}
                        id={user_.userID}
                        message={user_.messages.length ? user_.messages[user_.messages.length - 1].content : ''}
                        username={user_.userID == user.chatID ? 'Избранное' : user_.username}
                        time={user_.messages.length ? user_.messages[user_.messages.length - 1].time : ''}
                        connected={user_.userID == user.chatID ? false : user_.connected}
                        hasNewMessage={user_.hasNewMessage}/>
                )
            }
        </>
    );
};

export default Dialogs;
