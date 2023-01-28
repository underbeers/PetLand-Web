import React, {useState, createContext} from "react";
import {Route, Routes} from "react-router-dom";

import routesConfig from "../routes/routesconfig";
import {iUser, UserContext} from "../userContext";

import Header from "./Header/Header";


const App: React.FC = () => {

    // @ts-ignore
    const [user, setUser]: [iUser | null, (user: iUser | null) => void] = useState(null);

    return (
        <UserContext.Provider value={[user, setUser]}>
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
