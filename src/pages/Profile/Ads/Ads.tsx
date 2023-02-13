import React from "react";
import {NavLink, Route, Routes} from "react-router-dom";

import Tabs from "../../../components/Tabs/Tabs";

import Page404 from "../../Page404/Page404";

import noAds from './img/no_ads.jpg';

import styles from './Ads.module.css';


const Ads: React.FC = () => {
    return (
        <div className={styles.wrapper}>
            <h1>Мои объявления</h1>
            <Tabs>
                <NavLink to={'/profile/ads/actual'}>Актуальные</NavLink>
                <NavLink to={'/profile/ads/moderation'}>На модерации</NavLink>
                <NavLink to={'/profile/ads/archive'}>Архив</NavLink>
            </Tabs>
            <Routes>
                <Route path={'/actual'} element={
                    <div className={styles.no__ads}>
                        <img src={noAds} alt={''}/>
                        Похоже у вас нет актуальных объявлений
                    </div>
                }/>
                <Route path={'/moderation'} element={
                    <div className={styles.no__ads}>
                        <img src={noAds} alt={''}/>
                        Похоже у вас нет объявлений на модерации
                    </div>
                }/>
                <Route path={'/archive'} element={
                    <div className={styles.no__ads}>
                        <img src={noAds} alt={''}/>
                        Похоже у вас нет объявлений в архиве
                    </div>
                }/>
                <Route path={'/*'} element={<Page404/>}/>
            </Routes>
        </div>
    );
};

export default Ads;
