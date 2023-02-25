import React from "react";
import cn from "classnames";
import {NavLink} from "react-router-dom";

import styles from './Footer.module.css';


const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={cn('container', styles.content)}>
                <a href={"#"}>Разместить объявление</a>
                <a href={"#"}>Объявления</a>
                <a href={"#"}>Помощь</a>
                <a href={"#"}>Мобильное приложение</a>
                <a href={"#"}>Москва</a>
            </div>
        </footer>
    );
}

export default Footer;
