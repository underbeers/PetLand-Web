import React from 'react';

import {useChatContext} from '../../../chatContext';

import Dialog from '../Dialog/Dialog';


const Dialogs: React.FC<{ chatID: string | null }> = ({chatID}) => {
    const chat = useChatContext();

    const getUsers = () => chat.users//.filter(user => user.userID == chat.userID);
    return (<>
        {getUsers().map((user, index) => {
            return <Dialog
                key={index}
                id={user.userID}
                // @ts-ignore
                message={user.messages.length ? user.messages[user.messages.length - 1].content : ''}
                username={user.userID == chat.userID ? 'Избранное' : user.username}
                time={user.messages.length ? user.messages[user.messages.length - 1].time : ''}
                connected={user.userID == chat.userID ? false : user.connected}
                hasNewMessage={user.hasNewMessage}/>
        })
        }
    </>);
};

export default Dialogs;
