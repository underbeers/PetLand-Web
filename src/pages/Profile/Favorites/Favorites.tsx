import React, {useEffect, useState} from 'react';

import styles from './Favorites.module.css';
import FavoritesService from "../../../services/favoritesService";
import {useUserContext} from "../../../contexts/userContext";
import AdCard, {AdCardInfoType} from "../../../components/AdCard/AdCard";
import {useIsMobileContext} from "../../../contexts/isMobileContext";
import TopBar from "../../../components/TopBar/TopBar";

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

    const {user, setUser} = useUserContext();
    const isMobile = useIsMobileContext();

    useEffect(() => {
        FavoritesService.getFavorites(user.accessToken).then(response => {
            console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    return null;
            }
        }).then(body => {
            console.log(body);
            if (body) {
                setFavorites(body);
            }
        });
    }, [user]);

    return (
        <div>
            {isMobile ?
                <TopBar leftButton={"burger"}><h5>Избранное</h5></TopBar>
                :
                <h1>Избранное</h1>
            }
            <div className={styles.pets}>
                {favorites.adverts.map((ad, index) => {
                        ad.inFavorites = true;
                        return <AdCard key={index} size={"big"} info={ad}/>
                    }
                )}
            </div>
        </div>
    );
};

export default Favorites;
