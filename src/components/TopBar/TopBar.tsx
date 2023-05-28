import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import cn from 'classnames';

import BurgerMenu from '../BurgerMenu/BurgerMenu';
import Icons from '../UIKit/Icons';

import styles from './TopBar.module.css';


interface iTopBarProps {
    children: React.ReactNode;
    leftButton: 'burger' | 'arrow';
    className?: string;
}

const TopBar: React.FC<iTopBarProps> = ({children, leftButton, className}) => {
    const [openedBurger, setOpenedBurger] = useState(false);
    const toggleBurger = () => setOpenedBurger(!openedBurger);

    const navigate = useNavigate();

    const handleGoBack: React.MouseEventHandler<SVGSVGElement> = (e) => {
        e.preventDefault();
        navigate(-1);
    };

    return (
        <div className={cn(styles.bar, className)}>
            {leftButton === 'burger' ?
                <>
                    <Icons icon={'burger'} onClick={toggleBurger} className={styles.icon__left}/>
                    <BurgerMenu openedBurger={openedBurger} toggleBurger={toggleBurger}/>
                </> :
                <>
                    <Icons icon={'arrow-left'} onClick={handleGoBack} className={styles.icon__left}/>
                </>
            }
            {children}
        </div>
    );
};

export default TopBar;
