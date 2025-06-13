import { createContext } from 'react';

export const defaultConfig = {
  iconDefaultPrefix: 'icon__',
  preventFormDefaultAction: true,
};

/** @component */
export default createContext<any>(defaultConfig);
