import React, {ComponentType, useContext} from 'react';

import {UserContext} from '../userContext';
import OfferToSignIn from '../pages/OfferToSignIn/OfferToSignIn';


export function withOfferToSignIn(WrappedComponent: any) {
    return () => {
        const {user, setUser} = useContext(UserContext);
        return (
            user.empty && !user.loading ?
                <OfferToSignIn/> :
                <WrappedComponent/>
        );
    };
}
