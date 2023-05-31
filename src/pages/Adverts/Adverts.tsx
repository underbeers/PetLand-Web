import React, {useEffect, useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';

import {useUserContext} from '../../contexts/userContext';
import {useIsMobileContext} from '../../contexts/isMobileContext';
import AdvertService from '../../services/advertService';

import AdCard, {AdCardInfoType} from '../../components/AdCard/AdCard';
import PetTypes from '../../components/PetTypes/PetTypes';
import TopBar from '../../components/TopBar/TopBar';
import Tabs from '../../components/Tabs/Tabs';
import Checkbox from '../../components/UIKit/Checkbox';
import Icons from '../../components/UIKit/Icons';
import Button from '../../components/UIKit/Button';
import Input from '../../components/UIKit/Input';

import styles from './Adverts.module.css';


const Adverts: React.FC = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [typeSelected, setTypeSelected] = useState(true);

    const [isBigAd, setIsBigAd] = useState(true);

    const [sort, setSort] = useState(0);
    const [priceFrom, setPriceFrom] = useState(initialInputState);
    const [priceTo, setPriceTo] = useState(initialInputState);
    const [sterilized, setSterilized] = useState(false);
    const [vaccines, setVaccines] = useState(false);

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    const navigate = useNavigate();

    const [adverts, setAdverts] = useState<Array<AdCardInfoType>>([]);

    useEffect(() => {
        let params = '?';
        switch (sort) {
            case 1:
                params += 'sort=minPrice&';
                break;
            case 2:
                params += 'sort=maxPrice&';
                break;
            case 3:
                params += 'sort=publication&';
                break;
            default:
                break;
        }

        if (priceFrom.value) {
            params += `minPrice=${priceFrom.value}&`;
        }
        if (priceTo.value) {
            params += `maxPrice=${priceTo.value}&`;
        }

        if (sterilized) {
            params += ''
        }
        console.log(params)

        if (user.empty) {
            AdvertService.getAdverts(params).then(response => {
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
                AdvertService.getAuthorizedAdverts(user.accessToken, params).then(response => {
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
            }
        }
    }, [user, sort, priceFrom, priceTo, sterilized, vaccines]);

    const toggleSort = () => {
        setSort((sort + 1) % 4);
    }

    const sortType = (sort: number) => {
        switch (sort) {
            case 0:
                return 'По умолчанию';
            case 1:
                return 'По возрастанию цены';
            case 2:
                return 'По убыванию цены';
            case 3:
                return 'По дате публикации';
            default:
                return '';
        }
    }

    return (
        <>
            {isMobile &&
                <TopBar leftButton={'burger'}>
                    <h5>Доска объявлений</h5>
                    <Icons icon={'plus-circle-outline'} onClick={() => navigate('/new-ad')}/>
                </TopBar>
            }
            <div className={styles.content}>
                <div className={styles.tabs__button}>
                    <Tabs>
                        <NavLink to={'/adverts'}>Объявления</NavLink>
                        <NavLink to={'/lost-pets'}>Потеряшки</NavLink>
                    </Tabs>
                    {!isMobile &&
                        <Button color={'green'} onClick={() => navigate('/new-ad')} type={'secondary'}
                                text={'Разместить объявление'}/>
                    }
                </div>
                {!isMobile ?
                    <h1>Фильтры</h1>
                    :
                    <h3>Фильтры</h3>
                }
                <div className={styles.search__settings}>
                    <div className={styles.sort} onClick={toggleSort}>
                        <Icons icon={'sort-alt'}/>
                        <p>Сортировка ({sortType(sort)})</p>
                    </div>
                    {!isMobile &&
                        <div className={styles.grid} onClick={() => setIsBigAd(!isBigAd)}>
                            <Icons icon={isBigAd ? 'grid-2-1' : 'grid-2-2'}/>
                            <p>Изменить сетку</p>
                        </div>
                    }
                </div>

                <div className={styles.all__ads__filter}>
                    {typeSelected &&
                        <div className={styles.filters}>
                            <div className={styles.price}>
                                <Input type={'number'} value={priceFrom} setValue={setPriceFrom} label={'Цена'}
                                       placeholder={'От'} className={styles.priceFrom}/>
                                <Input type={'number'} value={priceTo} setValue={setPriceTo} placeholder={'До'}
                                       className={styles.priceTo}/>
                            </div>
                        </div>
                    }
                    <div className={styles.all__ads}>
                        {adverts.length ?
                            adverts.map((ad, index) =>
                                <AdCard
                                    key={index}
                                    size={isMobile ? 'small' : isBigAd ? 'big' : 'small'}
                                    info={ad}/>)
                            :
                            <h3>Объявлений по вашему запросу не найдено</h3>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Adverts;
