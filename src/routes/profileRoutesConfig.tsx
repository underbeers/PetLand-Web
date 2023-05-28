import {Navigate} from 'react-router-dom';

import Pets from '../pages/Profile/Pets/Pets';
import Adverts from '../pages/Profile/Adverts/Adverts';
import UserProfile from '../pages/Profile/UserProfile/UserProfile';
import Page404 from '../pages/Page404/Page404';
import Favorites from '../pages/Profile/Favorites/Favorites';
import InDevelop from '../pages/InDevelop/InDevelop';


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
        path: '/adverts',
        element: <Navigate to={PROFILE_PREFIX + '/adverts/actual'} replace={true}/>
    },
    {
        path: '/reviews',
        element: <InDevelop/>
    },
    {
        path: '/rates',
        element: <InDevelop/>
    },
    {
        path: '/',
        element: <UserProfile/>
    },
    {
        path: '/adverts/*',
        element: <Adverts/>
    },
    {
        path: '/*',
        element: <Page404/>
    },
]

export default profileRoutesConfig;
