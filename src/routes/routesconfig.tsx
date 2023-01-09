import HomePage from "../pages/HomePage/HomePage";

const routesConfig = [
    {
        path: '/',
        element: <HomePage/>,
    },
    {
        path: '/bulletin_board',
        element: <>Доска объявлений</>
    },
    {
        path: '/services',
        element: <>Сервисы</>
    },
    {
        path: '/services/specialists',
        element: <>Специалисты</>
    },
    {
        path: '/services/clinics',
        element: <>Клиники и гостиницы</>
    },
    {
        path: '/services/events',
        element: <>Мероприятия</>
    },
    {
        path: '/*',
        element: <>404</>
    },
];

export default routesConfig;
