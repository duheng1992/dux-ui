import React, { ReactNode } from 'react';

import usePopoverConfig, { useShouldUsePopoverConfig } from '../hooks/usePopoverConfig';

import Popover, { Animation, Trigger, Placement } from './Popover';

export interface PopoverProps {
  /** 受控，控制弹出层展示 */
  visible: boolean;
  /** 非受控，是否默认展示弹出层 */
  defaultVisible?: boolean;
  /** 弹出层显示隐藏时触发 */
  onVisibleChange?: any;
  /** 如何触发弹出层，focus 需要注意被包裹元素必须能触发 focus 事件，如链接、按钮、input 等, 可选：'hover' | 'focus' | 'click' | 'contextMenu' */
  trigger?: string[];
  /** 根据鼠标位置定位 */
  alignPoint?: boolean;
  /** 位置 */
  placement?:
    | 'topLeft'
    | 'top'
    | 'topRight'
    | 'bottomLeft'
    | 'bottom'
    | 'bottomRight'
    | 'leftTop'
    | 'left'
    | 'leftBottom'
    | 'rightTop'
    | 'right'
    | 'rightBottom';
  /** 自定义定位 */
  align?: any;
  /** 尺寸自适应，'width', 'minWidth', 'height', 'minHeight' 或混合使用 */
  stretch?: string[];
  /** 弹出层内容 */
  popup: ReactNode;
  /** 弹出层的类名 */
  popupClassName?: string;
  /** 弹出层的样式 */
  popupStyle?: any;
  /** 弹出层的 z-index */
  zIndex?: number;
  /** 自定义弹出层容器 */
  getPopupContainer?: any;
  /** 是否使用最上层传入的安全容器，如果为 function，在没有找到安全容器时将会使用该 function 作为 getPopupContainer 的值 */
  forwardPopupContainer?: any;
  /** 需要对子元素进行定位，所以只接收一个有效 react 元素（不接收文本节点） */
  children: any;
  /** 动画名称，slide-up 只支持上下方向的弹窗 */
  animation?: 'fade' | 'zoom' | 'bounce' | 'slide-up';
  forceAlignWhenUpdate?: boolean;
  /** 滚动时强制重新定位 */
  forceAlignWhenScroll?: boolean;
}

// eslint-disable-next-line react/display-name
const FinalPopover = React.forwardRef((props: PopoverProps, ref: any) => {
  const shouldUsePopoverConfig = useShouldUsePopoverConfig();
  const popoverConfigProps = usePopoverConfig();
  if (shouldUsePopoverConfig) {
    return <Popover ref={ref} {...popoverConfigProps} {...props} />;
  } else {
    return <Popover ref={ref} {...props} />;
  }
});

Object.assign(FinalPopover, {
  Animation,
  Trigger,
  Placement,
});

export default FinalPopover;
