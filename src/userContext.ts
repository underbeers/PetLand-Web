import React from "react";

export interface iUser {
    Email: string;
    FirstName: string;
    MobilePhone: string;
    SurName: string;
}

// @ts-ignore
export const UserContext = React.createContext();
