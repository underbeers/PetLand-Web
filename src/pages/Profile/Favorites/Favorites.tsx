import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

import FavoritesService from '../../../services/favoritesService';
import {useUserContext} from '../../../contexts/userContext';
import {useIsMobileContext} from '../../../contexts/isMobileContext';

import AdCard, {AdCardInfoType} from '../../../components/AdCard/AdCard';
import TopBar from '../../../components/TopBar/TopBar';
import Button from '../../../components/UIKit/Button';

import styles from './Favorites.module.css';


type FavoritesType = {
    adverts: Array<AdCardInfoType>,
    events: Array<{}>,
    organizations: Array<{}>,
    specialists: Array<{}>
}

const Favorites: React.FC = () => {
    const [favorites, setFavorites] = useState<FavoritesType>({
        adverts: [],
        events: [],
        organizations: [],
        specialists: []
    });
    const navigate = useNavigate();

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    useEffect(() => {
        FavoritesService.getFavorites(user.accessToken).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            //console.log(body);
            if (body) {
                setFavorites(body);
            }
        });
    }, [user]);

    return (
        <div>
            {isMobile ?
                <TopBar leftButton={'burger'}><h5>Избранное</h5></TopBar>
                :
                <h1>Избранное</h1>
            }
            <div className={styles.pets}>
                {favorites.adverts.length ?
                    favorites.adverts.map((ad, index) => {
                            ad.inFavorites = true;
                            return <AdCard key={index} size={isMobile ? 'small' : 'big'} info={ad}/>
                        }
                    )
                    :
                    <div className={styles.no_favorites}>
                        <h4>Вы ещё ничего не добавили в избранное</h4>
                        <Button type={'primary'} color={'orange'} text={'К доске объявлений'}
                                onClick={() => navigate('/adverts')}/>
                    </div>
                }
            </div>
        </div>
    );
};

export default Favorites;
