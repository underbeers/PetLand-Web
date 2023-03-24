import React, {useContext, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import profileRoutesConfig from '../../routes/profileRoutesConfig';
import {UserContext} from '../../userContext';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';

import SideBarProfile from '../../components/SideBarProfile/SideBarProfile';
import TapBarProfile from '../../components/TapBarProfile/TapBarProfile';

import styles from './Profile.module.css';


const Profile: React.FC = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <div className={styles.wrapper}>
            {!isMobile ? <SideBarProfile/> : <TapBarProfile format={'circle'}/>}
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
