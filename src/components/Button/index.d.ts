import { PureComponent, ReactNode } from 'react';
declare const defaultProps: {
  styleType: string;
  size: string;
  type: string;
};
export interface ButtonProps {
  /** 按钮类型 */
  styleType?: 'primary' | 'warning' | 'success' | 'error' | 'border' | 'border-gray';
  /** 按钮尺寸 */
  size?: 'sm' | 'md' | 'lg';
  /** 形状 */
  shape?: 'circle' | 'square';
  /** 阴影 */
  shadowed?: boolean;
  /** 主题 */
  /** 是否加载中 */
  loading?: boolean;
  /** 图标，传入 string 时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在 children 中 */
  icon?: string | ReactNode;
  /** 设置原生的 button 上 type 属性 */
  type?: string;
  /** 展示设置为块元素 */
  block?: boolean;
}
/**
 * The button component.
 *
 * @version 1.0.0
 * @author [heng.du](https://gitee.com/dh1992)
 */
export default class Button extends PureComponent<ButtonProps & typeof defaultProps> {
  static defaultProps: {
    styleType: string;
    size: string;
    type: string;
  };
  static StyleTypes: ['primary', 'warning', 'success', 'error', 'border', 'border-gray'];
  static Sizes: ['sm', 'md', 'lg'];
  static Shapes: ['circle', 'square'];
  static displayName: string;
  renderIcon: () => {} | null | undefined;
  render(): JSX.Element;
}
export {};
