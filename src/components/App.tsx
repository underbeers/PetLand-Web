import React, {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom";

import mainRoutesConfig from "../routes/mainRoutesConfig";
import {initialUserContextState, UserContext} from "../userContext";
import userService from "../services/userService";

import Header from "./Header/Header";
import Footer from "./Footer/Footer";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);
    useEffect(() => {
        const localUser = localStorage.getItem('accessToken');
        if (localUser && localUser != 'undefined') {
            userService.syncUser(user, setUser, true);
        }
    }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            <div style={{minHeight: '100vh', display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center"}}>
                <Header/>
                <main className='container' style={{flex: 1, width: '100%', display: "flex"}}>
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
            </div>
        </UserContext.Provider>
    );
};

export default App;
