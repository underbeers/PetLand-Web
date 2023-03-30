import React from 'react';

export interface iUser {
    email: string;
    firstName: string;
    surName: string;
    userID: string
    photo: string;
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
        empty: true,
        loading: false
    },
    setUser: (user: iUser) => {}
};

export const UserContext = React.createContext<{ user: iUser, setUser: (user: iUser) => void }>(initialUserContextState);
