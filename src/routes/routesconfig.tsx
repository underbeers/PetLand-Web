import HomePage from '../pages/HomePage/HomePage';


export const PATH_PREFIX = '';

const routesConfig = [
    {
        path: PATH_PREFIX + '/',
        element: <HomePage/>,
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
        element: <>404</>
    },
];

export default routesConfig;
