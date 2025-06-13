import React, { ReactNode } from 'react';

import ThemeProvider from '../ThemeProvider';

import ConfigContext, { defaultConfig } from './ConfigContext';

export interface ConfigProviderProps {
  /** @ignore */
  children: ReactNode;

  /** 提供时会使用 ThemeProvider 包裹 */
  theme?: any;
}

const ConfigProvider = ({ children, theme, ...rest }: ConfigProviderProps) => {
  let provider = (
    <ConfigContext.Provider value={{ ...defaultConfig, ...rest }}>
      {children}
    </ConfigContext.Provider>
  );
  if (theme) provider = <ThemeProvider theme={theme}>{provider}</ThemeProvider>;

  return provider;
};

export default ConfigProvider;
