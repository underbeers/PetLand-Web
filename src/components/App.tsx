import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';
import cn from 'classnames';

import mainRoutesConfig from '../routes/mainRoutesConfig';
import {initialUserContextState, UserContext} from '../userContext';
import userService from '../services/userService';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './App.module.css';
import chatService from "../services/chatService";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);
    useEffect(() => {
        const localUser = localStorage.getItem('accessToken');
        if (localUser && localUser != 'undefined') {
            user.loading = true;
            user.accessToken = localUser;
            userService.syncUser(user, setUser, true);
        }
    }, []);

    useEffect(()=>{
        if (!user.empty) {
            if (user.chatID) {
                chatService.auth(user);
                console.log('auth');
            } else {
                chatService.registerUser(user).then(() => {
                    chatService.auth(user);
                    console.log('auth');
                });
            }
        }
    }, [user]);

    return (
        <UserContext.Provider value={{user, setUser}}>
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
        </UserContext.Provider>
    );
};

export default App;
