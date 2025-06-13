import React, { ButtonHTMLAttributes, PureComponent, ReactNode } from 'react';

import Icon from '../Icon';
// import SvgIcon from '@/components/SvgIcon';
import { Override } from '../../type';

import { StyleButton, iconCls } from './style';
import { StyleTypes, Sizes, Shapes } from './shared';

const defaultProps = {
  styleType: 'border',
  size: 'md',
  type: 'button',
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
  // theme?: 'dark';
  /** 是否加载中 */
  loading?: boolean;
  /** 图标，传入 string 时为图标类型，也可直接传入图标组件，需要图标位置等更多自定义请直接放在 children 中 */
  icon?: string | ReactNode;
  /** 设置原生的 button 上 type 属性 */
  type?: string;
  /** 展示设置为块元素 */
  block?: boolean;
  /** 外部样式 */
  style?: object;
  /** 点击事件 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /** 是否禁用 */
  disabled?: boolean;
  /** children */
  children?: any;
}

/**
 * The button component.
 *
 * @version 1.0.0
 * @author [heng.du](https://gitee.com/dh1992)
 */
export default class Button extends PureComponent<ButtonProps & typeof defaultProps> {
  static defaultProps = defaultProps;
  static StyleTypes = StyleTypes;
  static Sizes = Sizes;
  static Shapes = Shapes;
  static displayName: string;
  static style: any;

  renderIcon = () => {
    const { loading, icon } = this.props;
    if (loading) {
      return <Icon className={iconCls} type="loading" />;
      // return <SvgIcon className={iconCls} type="ring-loading" spin />;
    } else if (typeof icon === 'string') {
      return <Icon className={iconCls} type={icon} />;
    }
    return icon;
  };
  render() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, icon, children, ...rest } = this.props;

    return (
      <StyleButton loading={loading} {...rest}>
        {this.renderIcon()}
        {children}
      </StyleButton>
    );
  }
}

Button.displayName = 'Button';
