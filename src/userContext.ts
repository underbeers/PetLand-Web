import React from 'react';

export interface iUser {
    email: string;
    firstName: string;
    surName: string;
    userID: string
    photo: string;
    accessToken: string;
    empty: boolean;
    loading: boolean;
}

export const initialUserContextState = {
    user: {
        email: '',
        firstName: '',
        surName: '',
        userID: '',
        photo: '',
        accessToken: '',
        empty: true,
        loading: false
    },
    setUser: (user: iUser) => {}
};

export const UserContext = React.createContext<{ user: iUser, setUser: (user: iUser) => void }>(initialUserContextState);
