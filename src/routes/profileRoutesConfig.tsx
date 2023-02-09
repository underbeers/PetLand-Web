import PetCard from "../components/PetCard/PetCard";
import Profile from "../pages/Profile/Profile";
import Pets from "../pages/Profile/Pets/Pets";

const PROFILE_PREFIX = ''

const profileRoutesConfig = [
    {
        path: PROFILE_PREFIX + '/pets',
        element: <Pets/>
    },
    {
        path: PROFILE_PREFIX + '/*',
        element: <></>
    },
]

export default profileRoutesConfig;
