import HomePage from '../pages/HomePage/HomePage';
import Page404 from '../pages/Page404/Page404';
import Pets from "../pages/Profile/Pets/Pets";

export const PATH_PREFIX = '';

const routesConfig = [
    {
        path: PATH_PREFIX + '/',
        element: <HomePage />,
    },
    {
        path: PATH_PREFIX + '/bulletin_board',
        element: <>Доска объявлений</>
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
        path: PATH_PREFIX + '/*',
        element: <Page404/>

    },
    {
        path: PATH_PREFIX + '/profile/pets',
        element: <Pets/>

    },
];

export default routesConfig;
