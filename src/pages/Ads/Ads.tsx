import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import AdCards from '../../components/AdCards/AdCards';
import PetTypes from '../../components/PetTypes/PetTypes';
import TopBar from '../../components/TopBar/TopBar';
import Tabs from '../../components/Tabs/Tabs';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';

import styles from './Ads.module.css';


const Ads = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [request, setRequest] = useState(initialInputState);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
        {isMobile &&
        <TopBar leftButton={'burger'}>
            <Input type={'search'} value={request} setValue={setRequest} />
            <Icons icon={'geo'}/>
            <Icons icon={'plus-circle-outline'}/>
        </TopBar>
        }
        <div className={styles.content}>
            <div className={styles.tabs__button}>
                <Tabs>
                    <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                    <NavLink to={'/lost-pets'}>Потеряшки</NavLink>
                </Tabs>
                {!isMobile &&
                <Button color={'green'} onClick={() => {
                }} type={'secondary'} text={'Разместить объявление'}/>}
            </div>
            {!isMobile &&
                <div className={styles.search__block}>
                    <Input type={'search'} value={request} setValue={setRequest} placeholder={'Поиск по объявлениям'}
                           className={styles.search}/>
                    <div className={styles.icon__city}>
                        <Icons icon={'geo'}/>
                        <a href={'#'}>Нижний Новгород</a>
                    </div>
                </div>
            }

            <PetTypes/>


                <h1>Актуальные объявления</h1>

                <div className={styles.all__ads}>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                    <AdCards size={'small'}/>
                </div>
        </div>
        </>
    )
}

export default Ads;
