import React, {useState, createContext} from "react";
import {Route, Routes} from "react-router-dom";

import routesConfig from "../routes/routesconfig";
import {initialUserContextState, iUser, UserContext} from "../userContext";

import Header from "./Header/Header";


const App: React.FC = () => {

    const [user, setUser] = useState(initialUserContextState.user);

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
        </UserContext.Provider>
    );
};

export default App;
