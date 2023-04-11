import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';

import Checkbox from '../../components/UIKit/Checkbox';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';
import AdCards from '../../components/AdCards/AdCards';
import PetTypes from '../../components/PetTypes/PetTypes';
import TopBar from '../../components/TopBar/TopBar';
import Tabs from '../../components/Tabs/Tabs';

import styles from './Ads.module.css';


const Ads: React.FC = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [request, setRequest] = useState(initialInputState);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
    const [isBigAd, setIsBigAd] = useState(false);
    const [breed, setBreed] = useState(initialInputState);
    const [priceFrom, setPriceFrom] = useState(initialInputState);
    const [priceTo, setPriceTo] = useState(initialInputState);
    const [sterilized, setSterilized] = useState(false);
    const [vaccines, setVaccines] = useState(false);

    window.addEventListener('resize', () => {
        setIsMobile(window.innerWidth <= 700)
    });

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>

                    <Input type={'search'} value={request} setValue={setRequest} placeholder={'Поиск по объявлениям'}/>
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
                        <Input type={'search'} value={request} setValue={setRequest}
                               placeholder={'Поиск по объявлениям'}
                               className={styles.search}/>
                        <div className={styles.icon__city}>
                            <Icons icon={'geo'}/>
                            <a href={'#'} className={'underlined'}>Нижний Новгород</a>
                        </div>
                    </div>
                }

                {!request.ok && <PetTypes/>}


                {!isMobile ? !request.ok ? <h1>Актуальные объявления</h1> : <h1>{request.value} в Нижнем Новгороде</h1> : !request.ok ? <h3>Актуальные объявления</h3> : <h3>{request.value} в Нижнем Новгороде</h3>}

                {request.ok &&
                    <div className={styles.search__settings}>
                        <div className={styles.sort}>
                            <Icons icon={'sort-alt'}/>
                            <p>Сортировка</p>
                        </div>

                        {!isMobile ? <div className={styles.grid} onClick={() => setIsBigAd(!isBigAd)}>
                                <Icons icon={'grid-2-2'}/>
                                <p>Изменить сетку</p>
                            </div>
                            :
                            <div className={styles.filters__mobile}>
                                <Icons icon={'filter'}/>
                                <p>Фильтры</p>
                            </div>
                        }
                    </div>
                }

                <div className={styles.all__ads__filter}>
                    {request.ok && !isMobile ?
                        <div className={styles.filters}>
                            <Input type={'dropdown'} value={breed} placeholder={'Порода'} setValue={setBreed}
                                   label={'Порода'} dropdownItems={[]}/>
                            <div className={styles.price}>
                                <Input type={'number'} value={priceFrom} setValue={setPriceFrom} label={'Цена'}
                                       placeholder={'От'} className={styles.priceFrom}/>
                                <Input type={'number'} value={priceTo} setValue={setPriceTo} placeholder={'До'}
                                       className={styles.priceTo}/>
                            </div>
                            <Checkbox isChecked={sterilized} setChecked={setSterilized}>Стерилизация</Checkbox>
                            <Checkbox isChecked={vaccines} setChecked={setVaccines}>Прививки</Checkbox>
                            <Button type={'secondary'} color={'orange'} text={'Применить'} onClick={() => {
                            }} disabled={true}/>
                        </div>
                        :
                        <>
                        </>
                    }

                    <div className={styles.all__ads}>
                        {isBigAd ?
                            <>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                                <AdCards size={'big'}/>
                            </>
                            :
                            <>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                                <AdCards size={'small'}/>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ads;
