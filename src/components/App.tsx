import React, {useEffect, useRef, useState} from 'react';
import {Route, Routes, useLocation, useSearchParams} from 'react-router-dom';
import cn from 'classnames';

import mainRoutesConfig from '../routes/mainRoutesConfig';
import {initialUserContextState, iUser, UserContext} from '../contexts/userContext';
import {ChatContext, ChatUserType, initialChatContextState} from '../contexts/chatContext';
import {IsMobileContext} from '../contexts/isMobileContext';
import userService from '../services/userService';

// @ts-ignore
import NotificationSound from '../static/notification.mp3';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './App.module.css';

const ScrollToTop = (props: any) => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    return <>{props.children}</>
};


const App: React.FC = () => {
    const [user, setUser] = useState<iUser>(structuredClone(initialUserContextState.user));
    const [chat, setChat] = useState<ChatContext>(initialChatContextState);
    const location = useLocation();

    const audioPlayer = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const chatParam = searchParams.get('chat');

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700);
    });

    function playAudio() {
        // @ts-ignore
        audioPlayer.current.play();
    }

    useEffect(() => {
        chat.users.forEach(user_ => {
            if (user_.userID == chatParam) {
                user_.hasNewMessage = false;
            }
        });
        //console.log('chatParam update');
        setChat({...chat});
    }, [chatParam]);

    useEffect(() => {
        if (user.loading) {
            return;
        }
        if (!user.empty) {
            //console.log(user);
            if (user.chatID && user.sessionID) {
                // authorisation
                chat.socket.auth = {sessionID: user.sessionID};
            } else {
                // registration
                chat.socket.auth = {username: `${user.firstName} ${user.surName}`};
            }
            chat.socket.connect();
            chat.socket.on('session', ({sessionID, userID}) => {
                if (user.sessionID && user.chatID) {
                    return;
                }
                if (user.sessionID == sessionID && user.chatID == userID) {
                    return;
                }
                chat.socket.auth = {sessionID};
                if (user.accessToken) {
                    userService.setChatUserIDSessionID({chatID: userID, sessionID: sessionID}, user.accessToken);
                }
                // @ts-ignore
                chat.socket.userID = userID;
                chat.userID = userID;
                // @ts-ignore
                chat.setChat = setChat;
                setChat({...chat});
            });
            chat.socket.onAny((event, ...args) => {
                //console.log(event, args);
            });
            chat.socket.on('disconnect', () => {
                setChat(initialChatContextState);
            });
            chat.socket.on('private message', (message: {
                content: string,
                from: string,
                to: string,
                time: string
            }) => {
                chat.users.forEach(user_ => {
                    if (message.from == user_.userID && message.to == user.chatID ||
                        message.from == user.chatID && message.to == user_.userID) {
                        user_.messages.push(message);
                    }
                    if (message.from != user.chatID && chatParam != message.from && message.from == user_.userID) {
                        user_.hasNewMessage = true;
                        playAudio();
                    }
                });
                setChat({...chat});
            });
            chat.socket.on('users', (usersNew: Array<ChatUserType>) => {
                usersNew.forEach(u => u.hasNewMessage = false);
                chat.users = structuredClone(usersNew);
                setChat({...chat});
            });
            chat.socket.on('user connected', (user) => {
                for (let i = 0; i < chat.users.length; i++) {
                    if (chat.users[i].userID == user.userID) {
                        chat.users[i].connected = true;
                        setChat({...chat});
                        return;
                    }
                }
            });
            chat.socket.on('user disconnected', (id) => {
                for (let i = 0; i < chat.users.length; i++) {
                    if (chat.users[i].userID == id) {
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
        <IsMobileContext.Provider value={isMobile}>
            <UserContext.Provider value={{user: user, setUser: setUser}}>
                <ChatContext.Provider value={chat}>
                    <audio ref={audioPlayer} src={NotificationSound}/>
                    <ScrollToTop>
                        <Header/>
                        <main className={cn(styles.main, 'container')}>
                            <Routes>
                                {mainRoutesConfig.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element}/>
                                ))}
                            </Routes>
                        </main>
                        {location.pathname != '/messenger' && location.pathname.substring(0, 8) != '/profile' &&
                            <Footer/>
                        }
                    </ScrollToTop>
                </ChatContext.Provider>
            </UserContext.Provider>
        </IsMobileContext.Provider>
    );
};

export default App;
