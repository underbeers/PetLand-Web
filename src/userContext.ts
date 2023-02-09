import React from 'react';

export interface iUser {
    email: string;
    firstName: string;
    surName: string;
    empty: boolean;
}

export const initialUserContextState = {
    user: {
        email: '',
        firstName: '',
        surName: '',
        empty: true
    },
    setUser: (user: iUser) => {}
};

export const UserContext = React.createContext<{ user: iUser, setUser: (user: iUser) => void }>(initialUserContextState);
