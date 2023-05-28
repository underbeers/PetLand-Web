import {createContext, useContext} from 'react';

export const IsMobileContext = createContext(false);

export const useIsMobileContext = () => useContext(IsMobileContext);
