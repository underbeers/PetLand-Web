import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import cn from 'classnames';

import mainRoutesConfig from '../routes/mainRoutesConfig';
import {initialUserContextState, iUser, UserContext} from '../userContext';
import userService from '../services/userService';
import chatService, {ChatUserType} from "../services/chatService";

import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './App.module.css';
import {ChatContext, useChatContext} from "../chatContext";


const App: React.FC = () => {
    const [user, setUser] = useState<iUser>(structuredClone(initialUserContextState.user));
    const [users, setUsers] = useState<Array<ChatUserType>>([]);

    useEffect(() => {
        const localUser = localStorage.getItem('accessToken');
        if (localUser && localUser != 'undefined') {
            setUser({...user, accessToken: localUser});
        }
    }, []);

    useEffect(() => {
        if (user.loading) {
            return;
        }
        if (!user.empty) {
            if (user.chatID) {
                chatService.socket.auth = {sessionID: user.chatID};
            } else {
                chatService.socket.auth = {username: `${user.firstName} ${user.surName}`};
            }
            chatService.socket.connect();
            chatService.socket.on("session", ({sessionID, userID}) => {
                chatService.socket.auth = {sessionID};
                if (user.accessToken) {
                    userService.setChatID({chatID: sessionID}, user.accessToken);
                }
                // @ts-ignore
                chatService.socket.userID = userID;
                chatService.userID = userID;
            });
        } else {
            if (user.accessToken) {
                userService.syncUser(user, setUser);
            }
        }
    }, [user]);



    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            <ChatContext.Provider value={{users: users, setUsers: setUsers}}>
                <Header/>
                <main className={cn(styles.main, 'container')}>
                    <Routes>
                        {mainRoutesConfig.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </main>
                <Footer/>
            </ChatContext.Provider>
        </UserContext.Provider>
    );
};

export default App;
