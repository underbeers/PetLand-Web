import Pets from "../pages/Profile/Pets/Pets";
import UserProfile from "../pages/Profile/UserProfile/UserProfile";

const PROFILE_PREFIX = ''

const profileRoutesConfig = [
    {
        path: PROFILE_PREFIX + '/pets',
        element: <Pets/>
    },
    {
        path: PROFILE_PREFIX + '/',
        element: <UserProfile/>
    },
    {
        path: PROFILE_PREFIX + '/*',
        element: <></>
    },
]

export default profileRoutesConfig;
