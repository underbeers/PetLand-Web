import React, {useContext, useState} from 'react';
import {io} from 'socket.io-client';

import styles from './HomePage.module.css'
import {UserContext} from "../../userContext";


const HomePage: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    const URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

    const socket = io(URL, {
        autoConnect: false
    });
    socket.on('new message', (value)=> {
        console.log('new message: ', value.message);
    });
    const [isConnected, setIsConnected] = useState(socket.connected);

    function connect() {
        socket.connect()
    }

    function disconnect() {
        socket.disconnect();
    }

    function identity () {
        console.log('emit identity')
        socket.emit('identity', user.chatID);
    }

    function subscribe () {
        console.log('emit subscribe')
        socket.emit('subscribe', '90a61f10501a4203a0530c462c0617f1')
    }

    function unsubscribe () {
        console.log('emit unsubscribe')
        socket.emit('unsubscribe', '90a61f10501a4203a0530c462c0617f1')
    }

    return (
        <div className="App">
            <p>State: { '' + isConnected }</p>
            <button onClick={ connect }>Connect</button>
            <button onClick={ disconnect }>Disconnect</button>
            <br/>
            <button onClick={identity}>Identity</button>
            <button onClick={subscribe}>Subscribe</button>
            <button onClick={unsubscribe}>Unsubscribe</button>
        </div>
    );
};

export default HomePage;
