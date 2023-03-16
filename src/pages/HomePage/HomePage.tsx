import React from 'react';

import styles from './HomePage.module.css'
import PetCard from "../../components/PetCard/PetCard";
import PetPage from "../PetPage/PetPage";
import TopBar from "../../components/TopBar/TopBar";
import Icons from "../../components/UIKit/Icons";
import BurgerMenu from "../../components/BurgerMenu/BurgerMenu";


const HomePage: React.FC = () => {
    return (
        <div>
            <TopBar leftButton={'burger'}>
                <h5>Главная</h5>
            </TopBar>
            Главная страница
        </div>
    );
};

export default HomePage;
