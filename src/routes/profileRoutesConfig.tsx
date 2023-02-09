import PetCard from "../components/PetCard/PetCard";
import Profile from "../pages/Profile/Profile";

const PROFILE_PREFIX = ''

const profileRoutesConfig = [
    {
        path: PROFILE_PREFIX + '/pets',
        element: <div>
            <h1>Мои питомцы</h1>
            <PetCard/>
        </div>
    },
    {
        path: PROFILE_PREFIX + '/*',
        element: <></>
    },
]

export default profileRoutesConfig;
