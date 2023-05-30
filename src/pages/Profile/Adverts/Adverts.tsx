import React, {useEffect, useState} from 'react';
import {NavLink, Route, Routes, useNavigate} from 'react-router-dom';

import {useIsMobileContext} from '../../../contexts/isMobileContext';
import {useUserContext} from '../../../contexts/userContext';
import AdvertService from '../../../services/advertService';

import Tabs from '../../../components/Tabs/Tabs';
import TopBar from '../../../components/TopBar/TopBar';
import AdCard, {AdCardInfoType} from '../../../components/AdCard/AdCard';
import Page404 from '../../Page404/Page404';

import Button from '../../../components/UIKit/Button';

import noAds from './img/no_ads.jpg';

import styles from './Adverts.module.css';


const Adverts: React.FC = () => {
    const isMobile = useIsMobileContext();
    const navigate = useNavigate();
    const {user, setUser} = useUserContext();
    const [adverts, setAdverts] = useState<Array<AdCardInfoType>>([]);

    useEffect(() => {
        if (user.empty) {
            return;
        }
        AdvertService.getAuthorizedAdverts(user.accessToken, `?userID=${user.userID}`).then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
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
    }, [user]);

    return (
        <>
            {isMobile ?
                <TopBar leftButton={'burger'}>
                    <h5>Объявления</h5>
                </TopBar>
                :
                <h1 className={styles.heading}>Объявления</h1>
            }
            <br/>
            {false &&
                <Tabs>
                    <NavLink to={'/profile/adverts/actual'}>Актуальные</NavLink>
                    <NavLink to={'/profile/adverts/archive'}>Архив</NavLink>
                </Tabs>
            }
            <Routes>
                <Route path={'/actual'} element={
                    <>
                        {adverts.length ?
                            <div className={styles.all__ads}>
                                {adverts.map((ad, index) =>
                                    <AdCard
                                        key={index}
                                        size={isMobile ? 'small' : 'small'}
                                        info={ad}/>)
                                }
                            </div>
                            :
                            <div className={styles.no__ads}>
                                <img src={noAds} alt={''}/>
                                <h3>Похоже у вас нет актуальных объявлений</h3>
                                <Button type={'primary'} color={'orange'} text={'Разместить объявление'}
                                        onClick={() => navigate('/new-ad')}/>
                            </div>
                        }
                    </>
                }/>
                <Route path={'/archive'} element={
                    <div className={styles.no__ads}>
                        <img src={noAds} alt={''}/>
                        <h3>Похоже у вас нет объявлений в архиве</h3>
                    </div>
                }/>
                <Route path={'/*'} element={<Page404/>}/>
            </Routes>
        </>
    );
};

export default Adverts;
