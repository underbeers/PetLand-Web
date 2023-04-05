import HomePage from '../pages/HomePage/HomePage';
import Profile from '../pages/Profile/Profile';
import NewPet from '../pages/NewPet/NewPet';
import Page404 from '../pages/Page404/Page404';
import EmailPage from '../pages/PasswordRecovery/EmailPage';
import NewPasswordPage from '../pages/PasswordRecovery/NewPasswordPage';
import PetPage from '../pages/PetPage/PetPage';
import Ads from '../pages/Ads/Ads';


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
        element: <>Сервисы</>
    },
    {
        path: PATH_PREFIX + '/services/specialists',
        element: <>Специалисты</>
    },
    {
        path: PATH_PREFIX + '/services/clinics',
        element: <>Клиники и гостиницы</>
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
        path: PATH_PREFIX + '/profile/*',
        element: <Profile/>
    },
    {
        path: PATH_PREFIX + '/*',
        element: <Page404/>
    },
];

export default routesConfig;
