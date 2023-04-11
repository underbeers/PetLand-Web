import React, {useContext} from 'react';

import {UserContext} from '../userContext';

import OfferToSignIn from '../pages/OfferToSignIn/OfferToSignIn';


export function withOfferToSignIn(WrappedComponent: any) {
    return () => {
        const {user, setUser} = useContext(UserContext);
        //console.log(user)
        return (
            (user.empty && !user.loading) ?
                <OfferToSignIn/> :
                <WrappedComponent/>
        );
    };
}
