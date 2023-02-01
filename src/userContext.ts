import React from "react";

export interface iUser {
    Email: string;
    FirstName: string;
    SurName: string;
}

export const initialUserContextState = {
    user: {
        Email: '',
        FirstName: '',
        SurName: '',
    },
    setUser: (user: iUser) => {}
};

export const UserContext = React.createContext<{user: iUser, setUser: (user: iUser) => void}>(initialUserContextState);
