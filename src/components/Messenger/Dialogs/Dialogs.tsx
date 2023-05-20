import React from 'react';

import {useChatContext} from '../../../chatContext';

import Dialog from '../Dialog/Dialog';


const Dialogs: React.FC<{ chatID: string | null }> = ({chatID}) => {
    const chat = useChatContext();

    // TODO: return only active dialogs or favorites
    const getUsers = () => chat.users.sort((u2, u1) => {
        if (u1.messages.length && u2.messages.length) {
            return new Date(u1.messages[u1.messages.length - 1].time).getTime() -
                new Date(u2.messages[u2.messages.length - 1].time).getTime();
        }
        if (u1.messages.length) {
            return 1;
        }
        return -1;
    })//.filter(user => user.userID == chat.userID);

    return (<>
        {
            getUsers().map((user, index) =>
                <Dialog
                    key={index}
                    id={user.userID}
                    message={user.messages.length ? user.messages[user.messages.length - 1].content : ''}
                    username={user.userID == chat.userID ? 'Избранное' : user.username}
                    time={user.messages.length ? user.messages[user.messages.length - 1].time : ''}
                    connected={user.userID == chat.userID ? false : user.connected}
                    hasNewMessage={user.hasNewMessage}/>
            )
        }
    </>);
};

export default Dialogs;
