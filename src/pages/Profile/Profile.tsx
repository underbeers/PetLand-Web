import React, {useContext} from "react";
import {Route, Routes} from "react-router-dom";

import profileRoutesConfig from "../../routes/profileRoutesConfig";
import {UserContext} from "../../userContext";

import styles from './Profile.module.css';


const Profile: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    return (user.Empty ?
            <>Войдите или зарегистрируйтесь</> :
            <div>
                <div className={styles.sidebar}>
                    Hello, {user.FirstName} {user.SurName}!
                </div>
                <div className={styles.content}>
                    <Routes>
                        {profileRoutesConfig.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                element={route.element}
                            />
                        ))}
                    </Routes>
                </div>
            </div>
    );
};

export default Profile;
