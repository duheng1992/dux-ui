import React from 'react';
import '../../style';
declare type SpinProps = {
  pulse: boolean;
};
export interface IconProps {
  /** 图标类型 */
  type: string;
  /** 是否旋转 */
  spin?: SpinProps;
  /** 自定义 icon 类名前缀，使用自定义图标库时使用，默认为 icon\_\_ */
  prefix?: string;
  /** 自定义 className */
  className?: string;
}
declare const _default: React.MemoExoticComponent<
  ({ type, spin, prefix, className, ...rest }: IconProps) => JSX.Element
>;
export default _default;
