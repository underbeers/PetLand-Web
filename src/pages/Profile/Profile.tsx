import React, {useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import profileRoutesConfig from '../../routes/profileRoutesConfig';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';

import SideBarProfile from '../../components/SideBarProfile/SideBarProfile';
import TapBarProfile from '../../components/TapBarProfile/TapBarProfile';

import styles from './Profile.module.css';
import {useIsMobileContext} from "../../contexts/isMobileContext";


const Profile: React.FC = () => {
    const isMobile = useIsMobileContext();

    return (
        <div className={styles.wrapper}>
            {!isMobile ? <SideBarProfile/> : <TapBarProfile/>}
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

export default withOfferToSignIn(Profile);
