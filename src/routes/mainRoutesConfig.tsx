import HomePage from '../pages/HomePage/HomePage';
import Profile from '../pages/Profile/Profile';
import NewPet from '../pages/NewPet/NewPet';
import Page404 from '../pages/Page404/Page404';
import EmailPage from '../pages/PasswordRecovery/EmailPage';
import NewPasswordPage from '../pages/PasswordRecovery/NewPasswordPage';
import PetPage from '../pages/PetPage/PetPage';
import AdPage from '../pages/AdPage/AdPage';
import Ads from '../pages/Ads/Ads';
import NewAd from '../pages/NewAd/NewAd';
import AllServices from '../pages/Services/AllServices';
import Specialists from '../pages/Services/Specialists/Specialists';
import SpecialistPage from '../pages/Services/Specialists/SpecialistPage';
import Organizations from '../pages/Services/Organizations/Organizations';
import OrganizationPage from '../pages/Services/Organizations/OrganizationPage';


export const PATH_PREFIX = '';

const routesConfig = [
    {
        path: PATH_PREFIX + '/',
        element: <HomePage/>,
    },
    {
        path: PATH_PREFIX + '/bulletin-board',
        element: <Ads/>
    },
    {
        path: PATH_PREFIX + '/lost-pets',
        element: <>Потеряшки</>
    },
    {
        path: PATH_PREFIX + '/services',
        element: <AllServices />
    },
    {
        path: PATH_PREFIX + '/services/specialists',
        element: <Specialists />
    },
    {
        path: PATH_PREFIX + '/services/organizations',
        element: <Organizations />
    },
    {
        path: PATH_PREFIX + '/services/events',
        element: <>Мероприятия</>
    },
    {
        path: PATH_PREFIX + '/new-pet',
        element: <NewPet/>
    },
    {
        path: PATH_PREFIX + '/password-recovery',
        element: <EmailPage/>
    },
    {
        path: PATH_PREFIX + '/new-password',
        element: <NewPasswordPage/>
    },
    {
        path: PATH_PREFIX + '/pet',
        element: <PetPage/>
    },
    {
        path: PATH_PREFIX + '/ad-page',
        element: <AdPage/>
    },
    {
        path: PATH_PREFIX + '/services/specialists/specialist-page',
        element: <SpecialistPage/>
    },
    {
        path: PATH_PREFIX + '/services/organizations/organization-page',
        element: <OrganizationPage/>
    },
    {
        path: PATH_PREFIX + '/profile/*',
        element: <Profile/>
    },
    {
        path: PATH_PREFIX + '/*',
        element: <Page404/>
    },
    {
        path: PATH_PREFIX + '/new-ad',
        element: <NewAd/>
    },
];

export default routesConfig;
