import PetCard from "../components/PetCard/PetCard";
import Profile from "../pages/Profile/Profile";
import Pets from "../pages/Profile/Pets/Pets";
import Page404 from "../pages/Page404/Page404";
import Ads from "../pages/Profile/Ads/Ads";
import {Navigate} from "react-router-dom";

const PROFILE_PREFIX = '/profile';

const profileRoutesConfig = [
    {
        path: '/pets',
        element: <Pets/>
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
