import React, {useEffect, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import mainRoutesConfig from '../routes/mainRoutesConfig';
import {initialUserContextState, UserContext} from '../userContext';
import userService from '../services/userService';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import styles from './App.module.css';
import cn from "classnames";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);
    useEffect(() => {
        const localUser = localStorage.getItem('accessToken');
        if (localUser && localUser != 'undefined') {
            setUser({...user, loading: true});
            userService.syncUser(user, setUser, true);
        }
    }, []);

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
