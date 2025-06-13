import { ReactNode } from 'react';
export interface ConfigProviderProps {
  /** @ignore */
  children: ReactNode;
  /** 提供时会使用 ThemeProvider 包裹 */
  theme?: any;
}
declare const ConfigProvider: ({ children, theme, ...rest }: ConfigProviderProps) => JSX.Element;
export default ConfigProvider;
