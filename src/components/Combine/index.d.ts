import React, { ReactNode } from 'react';
export interface DefinedCombineProps {
  children: ReactNode;
  /** children 共享属性 */
  sharedProps?: {
    /** 尺寸 */
    size?: 'sm' | 'md' | 'lg';
    /** className */
    className?: string;
    [key: string]: unknown;
  };
  /** 间距 */
  spacing?: 'compact' | 'smart' | 'sm' | 'md' | 'lg' | string;
  /** 分隔符 */
  separator?: ReactNode;
}
export declare type CombineProps = DefinedCombineProps;
declare const _default: React.MemoExoticComponent<
  ({ children, sharedProps, spacing, separator, ...rest }: DefinedCombineProps) => JSX.Element
>;
export default _default;
