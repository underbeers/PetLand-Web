import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import routesConfig from "../routes/routesconfig";
import {initialUserContextState, UserContext} from "../userContext";

import Header from "./Header/Header";
import userService from "../services/userService";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);
    useEffect(()=>{
        const user = localStorage.getItem('accessToken');
        if (user && user != 'undefined') {
            userService.syncUser(setUser, true);
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Header/>
            <div className='container'>
                <Routes>
                    {routesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
            <div></div>
        </UserContext.Provider>
    );
};

export default App;
