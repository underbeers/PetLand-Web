import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import AdvertService from '../../services/advertService';
import {useUserContext} from "../../contexts/userContext";

import AdCard, {AdCardInfoType} from '../../components/AdCard/AdCard';
import PetTypes from '../../components/PetTypes/PetTypes';
import TopBar from '../../components/TopBar/TopBar';
import Tabs from '../../components/Tabs/Tabs';
import Checkbox from '../../components/UIKit/Checkbox';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';

import styles from './Ads.module.css';
import {useIsMobileContext} from "../../contexts/isMobileContext";


const Ads: React.FC = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [typeSelected, setTypeSelected] = useState(false);

    const [isBigAd, setIsBigAd] = useState(true);
    const [breed, setBreed] = useState(initialInputState);
    const [priceFrom, setPriceFrom] = useState(initialInputState);
    const [priceTo, setPriceTo] = useState(initialInputState);
    const [sterilized, setSterilized] = useState(false);
    const [vaccines, setVaccines] = useState(false);

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();

    const [adverts, setAdverts] = useState<Array<AdCardInfoType>>([]);

    useEffect(() => {
        console.log('user changed')
        if (user.empty) {
            AdvertService.getAdverts().then(response => {
                //console.log(response);
                switch (response.status) {
                    case 200:
                        return response.json();
                    default:
                        //console.log('Error', response);
                        return null;
                }
            }).then((body: {
                nextPage: string,
                records: Array<AdCardInfoType>,
                totalCount: number, totalPage: number
            }) => {
                if (body) {
                    setAdverts(body.records);
                }
            });
        } else {
            if (user.accessToken) {
                AdvertService.getAuthorizedAdverts(user.accessToken).then(response => {
                    //console.log(response);
                    switch (response.status) {
                        case 200:
                            return response.json();
                        default:
                            //console.log('Error', response);
                            return null;
                    }
                }).then((body: {
                    nextPage: string,
                    records: Array<AdCardInfoType>,
                    totalCount: number, totalPage: number
                }) => {
                    if (body) {
                        console.log(body)
                        setAdverts(body.records);
                    }
                });
            }
        }
    }, [user]);

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
                        <Button color={'green'} onClick={() => navigate('/new-ad')} type={'secondary'}
                                text={'Разместить объявление'}/>}
                </div>
                {!isMobile &&
                    <div className={styles.icon__city}>
                        <Icons icon={'geo'}/>
                        <a href={'#'} className={'underlined'}>Нижний Новгород</a>
                    </div>
                }

                {!typeSelected && <PetTypes/>}


                {!isMobile ? !typeSelected ? <h1>Актуальные объявления</h1> :
                    <h1>Тип животного в Городе</h1> : !typeSelected ? <h3>Актуальные объявления</h3> :
                    <h3>Тип животного в Городе</h3>}

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
                        {
                            adverts.map((ad, index) =>
                                <AdCard
                                    key={index}
                                    size={isMobile ? 'small' : isBigAd ? 'big' : 'small'}
                                    info={ad}/>)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ads;
