import React, {useContext, useEffect} from "react";

import {UserContext} from "../../userContext";
import chatService from "../../services/chatService";


const Messenger: React.FC = () => {
    const {user, setUser} = useContext(UserContext);

    useEffect(()=>{
        if (user.chatID == '') {
            chatService.registerUser(user)
        }
    }, []);

    return (<>Messenger</>);
};

export default Messenger;
