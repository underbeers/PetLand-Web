import {Navigate} from 'react-router-dom';

import Pets from '../pages/Profile/Pets/Pets';
import Ads from '../pages/Profile/Ads/Ads';
import UserProfile from '../pages/Profile/UserProfile/UserProfile';
import Page404 from '../pages/Page404/Page404';
import Favorites from "../pages/Profile/Favorites/Favorites";


const PROFILE_PREFIX = '/profile';

const profileRoutesConfig = [
    {
        path: '/pets',
        element: <Pets/>
    },
    {
        path: '/favorites',
        element: <Favorites/>
    },
    {
        path: '/',
        element: <UserProfile/>
    },
    {
        path: '/ads',
        element: <Navigate to={PROFILE_PREFIX + '/ads/actual'} replace={true}/>
    },
    {
        path: '/ads/*',
        element: <Ads/>
    },
    {
        path: '/*',
        element: <Page404/>
    },
]

export default profileRoutesConfig;
