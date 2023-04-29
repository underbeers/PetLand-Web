import React, {useContext, useEffect, useState} from "react";
import Dialog from "../Dialog/Dialog";
import chatService from "../../../services/chatService";
import {useUserContext} from "../../../userContext";
import {useNavigate} from "react-router-dom";
import ChatLoader from "../ChatLoader/ChatLoader";
import {useChatContext} from "../../../chatContext";


type DialogsType = {
    chatRoomId: string;
    createdAt: string;
    message: {
        messageText: string
    };
    messageId: string;
    postedByUser: {
        createdAt: string;
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
        readByUser: Array<{
            createdAt: string;
            firstName: string;
            lastName: string;
            type: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }>
    }>;
    roomInfo: Array<Array<{
        createdAt: string;
        firstName: string;
        lastName: string;
        type: string;
        updatedAt: string;
        __v: number;
        _id: string;
    }>>
    type: string;
    _id: string;
};

const Dialogs: React.FC<{ chatID: string | null }> = ({chatID}) => {
    const {users, setUsers} = useChatContext();

    return (<>
        {users.map((user, index) => {
            return <Dialog
                key={index}
                id={user.userID}
                message={''}
                user={user.username}
                time={'2023-04-26T20:37:31+00:00'}/>
        })
        }
    </>);
};

export default Dialogs;
