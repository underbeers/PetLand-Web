import React, {useContext, useState} from 'react';

import {useUserContext} from "../../userContext";
import chatService from "../../services/chatService";

import styles from './HomePage.module.css'


const HomePage: React.FC = () => {
    const {user, setUser} = useUserContext();

    function unsubscribe () {
        console.log('emit unsubscribe')
        chatService.socket.emit('unsubscribe', '90a61f10501a4203a0530c462c0617f1')
    }

    return (
        <div className="App">
            <button onClick={unsubscribe}>Unsubscribe</button>
        </div>
    );
};

export default HomePage;
