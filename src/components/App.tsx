import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import cn from 'classnames';

import mainRoutesConfig from '../routes/mainRoutesConfig';
import {initialUserContextState, iUser, UserContext} from '../userContext';
import {ChatContext, ChatUserType, initialChatContextState} from '../chatContext';
import userService from '../services/userService';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './App.module.css';


const App: React.FC = () => {
    const [user, setUser] = useState<iUser>(structuredClone(initialUserContextState.user));
    const [chat, setChat] = useState<ChatContext>(initialChatContextState);

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
                chat.socket.auth = {sessionID: user.chatID};
            } else {
                chat.socket.auth = {username: `${user.firstName} ${user.surName}`};
            }
            chat.socket.connect();
            chat.socket.on('session', ({sessionID, userID}) => {
                chat.socket.auth = {sessionID};
                if (user.accessToken) {
                    userService.setChatID({chatID: sessionID}, user.accessToken);
                }
                // @ts-ignore
                chat.socket.userID = userID;
                chat.userID = userID;
                setChat({...chat});
            });
            chat.socket.onAny((event, ...args) => {
                console.log(event, args);
            });
            chat.socket.on('disconnect', () => {
                setChat(initialChatContextState);
            })
            chat.socket.on('private message', (message: { content: string, from: string, to: string, time: string }) => {
                const usersNew: Array<ChatUserType> = structuredClone(chat.users);
                chat.users = usersNew.map(user => {
                    if (user.userID == message.from) {
                        user.messages.push(message);
                    }
                    return user;
                });
                setChat({...chat});
            });
            chat.socket.on('users', (usersNew: Array<ChatUserType>) => {
                chat.users = structuredClone(usersNew);
                setChat({...chat});
            });
            chat.socket.on('user connected', (user) => {
                for (let i = 0; i < chat.users.length; i++) {
                    if (chat.users[i].userID === user.userID) {
                        chat.users[i].connected = true;
                        setChat({...chat});
                        return;
                    }
                }
            });
            chat.socket.on('user disconnected', (id) => {
                for (let i = 0; i < chat.users.length; i++) {
                    if (chat.users[i].userID === id) {
                        chat.users[i].connected = false;
                        setChat({...chat});
                        return;
                    }
                }
            });
        } else {
            if (user.accessToken) {
                userService.syncUser(user, setUser);
            }
        }
    }, [user]);


    return (
        <UserContext.Provider value={{user: user, setUser: setUser}}>
            <ChatContext.Provider value={chat}>
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
