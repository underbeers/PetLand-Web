import React from 'react';

import styles from './HomePage.module.css'
import PetCard from "../../components/PetCard/PetCard";
import PetPage from "../PetPage/PetPage";
import TopBar from "../../components/TopBar/TopBar";
import Icons from "../../components/UIKit/Icons";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";
import Tabs from "../../components/Tabs/Tabs";
import {NavLink} from "react-router-dom";


const HomePage: React.FC = () => {
    return (
        <div>
            <TopBar leftButton={'burger'}>
                <h5>Главная</h5>
            </TopBar>
            Главная страница
            <Tabs>
                <NavLink to={'/profile/ads/actual'}>Актуальные</NavLink>
                <NavLink to={'/profile/ads/moderation'}>На модерации</NavLink>
                <NavLink to={'/profile/ads/archive'}>Архив</NavLink>
            </Tabs>
        </div>
    );
};

export default HomePage;
