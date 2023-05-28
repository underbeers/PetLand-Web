import React from 'react';

import {useUserContext} from '../contexts/userContext';

import OfferToSignIn from '../pages/OfferToSignIn/OfferToSignIn';


export function withOfferToSignIn(WrappedComponent: any) {
    return () => {
        const {user, setUser} = useUserContext();
        //console.log(user)
        return (
            (user.empty && !user.loading) ?
                <OfferToSignIn/> :
                <WrappedComponent/>
        );
    };
}
