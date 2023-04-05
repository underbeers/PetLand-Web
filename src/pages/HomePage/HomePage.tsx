import React from 'react';

import styles from './HomePage.module.css'


const HomePage: React.FC = () => {
    return (
        <div>
            <p>Главная страница</p>
            <a href={'/profile'}>Профиль</a>
        </div>
    );
};

export default HomePage;
