import React from 'react';

import styles from './HomePage.module.css';
import EmailPage from "../PasswordRecovery/EmailPage";
import NewPasswordPage from "../PasswordRecovery/NewPasswordPage";


const HomePage: React.FC = () => {
    return (
        <>
            <NewPasswordPage/>
        </>
    );
};

export default HomePage;
