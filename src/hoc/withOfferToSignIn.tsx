import React, {useContext} from 'react';

import {useUserContext} from '../userContext';

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
