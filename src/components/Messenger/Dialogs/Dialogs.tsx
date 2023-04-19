import React, {useContext, useEffect, useState} from "react";
import Dialog from "../Dialog/Dialog";
import chatService from "../../../services/chatService";
import {UserContext} from "../../../userContext";
import {useNavigate} from "react-router-dom";
import PawLoader from "../PawLoader/PawLoader";


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
    const {user, setUser} = useContext(UserContext);
    const [registration, setRegistration] = useState(false);
    const [dialogs, setDialogs] = useState(Array<DialogsType>);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        if (user.chatAccessToken) {
            chatService.loadDialogs(user, setDialogs);
        }
        console.log('dialogs')
    }, [user.loading]);

    if (loading) {
        return (<PawLoader/>);
    }
    return (<>
        {dialogs.sort((d1, d2) => {
            return new Date(d1.createdAt) < new Date(d2.createdAt) ? 1 : -1
        }).map(dialog => {
            let name = '';
            dialog.roomInfo.forEach(info => {
                if (info.length) {
                    if (info[0]._id != user.chatID) {
                        name = info[0].firstName + ' ' + info[0].lastName;
                    }
                }
            });
            return <Dialog
                key={dialog.chatRoomId}
                id={dialog.chatRoomId}
                message={dialog.message.messageText}
                user={name}
                time={dialog.createdAt}/>
        })}
    </>);
};

export default Dialogs;
