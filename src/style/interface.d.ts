import { defaultDesignTokens, defaultTheme } from '../components/ThemeProvider/theme';
export declare type DesignTokens = typeof defaultDesignTokens;
export declare type DesignToken = keyof DesignTokens;
export interface Theme {
  designTokens: DesignTokens;
  [key: string]: unknown;
}
export { defaultTheme };
