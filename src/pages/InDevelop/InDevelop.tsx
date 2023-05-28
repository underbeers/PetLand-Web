import React from 'react';

import TopBar from "../../components/TopBar/TopBar";

import styles from './InDevelop.module.css';
import {useIsMobileContext} from "../../contexts/isMobileContext";


const InDevelop: React.FC = () => {
    const isMobile = useIsMobileContext();

    return (
        <>
            {isMobile && <TopBar leftButton={"arrow"}><h5>Страница в разработке</h5></TopBar>}
            <div className={styles.wrapper}>
                <h1>Эта страница находится в разработке</h1>
                <h2>Загляните сюда позже</h2>
            </div>
        </>
    );
};

export default InDevelop;
