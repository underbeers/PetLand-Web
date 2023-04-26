import React, {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

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
    const [typeSelected, setTypeSelected] = useState(false);

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

    const navigate = useNavigate();

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Доска объявлений</h5>
                    <Icons icon={'geo'}/>
                    <Icons icon={'plus-circle-outline'} onClick={() => navigate('/new-ad')}/>
                </TopBar>
            }
            <div className={styles.content}>
                <div className={styles.tabs__button}>
                    <Tabs>
                        <NavLink to={'/bulletin-board'}>Объявления</NavLink>
                        <NavLink to={'/lost-pets'}>Потеряшки</NavLink>
                    </Tabs>
                    {!isMobile &&
                        <Button color={'green'} onClick={() => navigate('/new-ad')} type={'secondary'} text={'Разместить объявление'}/>}
                </div>
                {!isMobile &&
                        <div className={styles.icon__city}>
                            <Icons icon={'geo'}/>
                            <a href={'#'} className={'underlined'}>Нижний Новгород</a>
                        </div>
                }

                {!typeSelected && <PetTypes/>}


                {!isMobile ? !typeSelected ? <h1>Актуальные объявления</h1> : <h1>Тип животного в Городе</h1> : !typeSelected ? <h3>Актуальные объявления</h3> : <h3>Тип животного в Городе</h3>}

                {typeSelected &&
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
                    {typeSelected && !isMobile ?
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
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                                <AdCards size={'big'} url={`/ad-page`}/>
                            </>
                            :
                            <>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                                <AdCards size={'small'} url={`/ad-page`}/>
                            </>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ads;
