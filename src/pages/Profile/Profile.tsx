import React, {useContext} from 'react';
import {Route, Routes} from 'react-router-dom';

import profileRoutesConfig from '../../routes/profileRoutesConfig';
import {UserContext} from '../../userContext';

import SideBarProfile from '../../components/SideBarProfile/SideBarProfile';

import OfferToSignIn from '../OfferToSignIn/OfferToSignIn';

import styles from './Profile.module.css';



const Profile: React.FC = () => {
    const {user, setUser} = useContext(UserContext);
    return (user.empty ?
            <OfferToSignIn/> :
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <SideBarProfile />
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
