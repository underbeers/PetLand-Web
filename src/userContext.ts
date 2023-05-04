import {createContext, useContext} from 'react';

export interface iUser {
    email: string;
    firstName: string;
    surName: string;
    userID: string;
    chatUserID: string;
    sessionID: string;
    photo: string;
    accessToken: string;
    empty: boolean;
    loading: boolean;
}
export type UserContext = {
    user: iUser,
    setUser: (user: iUser) => void;
}

export const initialUserContextState: UserContext = {
    user: {
        email: '',
        firstName: '',
        surName: '',
        userID: '',
        chatUserID: '',
        sessionID: '',
        photo: '',
        accessToken: '',
        empty: true,
        loading: false
    },
    setUser: (user: iUser) => {}
};

export const UserContext = createContext<UserContext>(initialUserContextState);
export const useUserContext = () => useContext(UserContext);
