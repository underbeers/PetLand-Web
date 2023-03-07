import React, {useContext, useState} from 'react';
import {Route, Routes} from 'react-router-dom';

import profileRoutesConfig from '../../routes/profileRoutesConfig';
import {UserContext} from '../../userContext';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';

import SideBarProfile from '../../components/SideBarProfile/SideBarProfile';
import TapBarProfile from '../../components/TapBarProfile/TapBarProfile';

import OfferToSignIn from '../OfferToSignIn/OfferToSignIn';

import styles from './Profile.module.css';


const Profile: React.FC = () => {

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });


    const {user, setUser} = useContext(UserContext);
    return (<div className={styles.wrapper}>
            {!isMobile ?
                <div className={styles.sidebar}>
                    <SideBarProfile/>
                </div>
                :
                <div className={styles.tapbar}>
                    <TapBarProfile format={'circle'}/>
                </div>
            }
            <div className={styles.content}>
                {user.loading ?
                    <>
                        <div className={'loading'} style={{width: 240, height: '2em', borderRadius: 10, margin: 40}}/>
                        <div className={'loading'}
                             style={{width: 540, height: '2em', borderRadius: 10, margin: '20px 40px'}}/>
                        <div className={'loading'}
                             style={{width: 340, height: '2em', borderRadius: 10, margin: '20px 40px'}}/>
                        <div className={'loading'}
                             style={{width: 420, height: '2em', borderRadius: 10, margin: '20px 40px'}}/>
                        <div className={'loading'}
                             style={{width: 540, height: '2em', borderRadius: 10, margin: '20px 40px'}}/>
                        <div className={'loading'}
                             style={{width: 740, height: '2em', borderRadius: 10, margin: '20px 40px'}}/>
                    </> :
                    <>
                        <Routes>
                            {profileRoutesConfig.map((route, index) => (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={route.element}
                                />
                            ))}
                        </Routes>
                    </>
                }
            </div>
        </div>
    );
};

export default withOfferToSignIn(Profile);
