import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import mainRoutesConfig from "../routes/mainRoutesConfig";
import {initialUserContextState, UserContext} from "../userContext";
import userService from "../services/userService";

import Header from "./Header/Header";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);
    useEffect(()=>{
        const localUser = localStorage.getItem('accessToken');
        if (localUser && localUser != 'undefined') {
            userService.syncUser(user, setUser, true);
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <Header/>
            <div className='container'>
                <Routes>
                    {mainRoutesConfig.map((route, index) => (
                        <Route
                            key={index}
                            path={route.path}
                            element={route.element}
                        />
                    ))}
                </Routes>
            </div>
           {/*TODO Add footer*/}
            <div></div>

        </UserContext.Provider>
    );
};

export default App;
