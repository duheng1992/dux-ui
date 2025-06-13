import classnames from 'classnames';
import React, { ReactNode, useMemo } from 'react';

import Popover from '../Popover';
import { getPlacements } from '../Popover/placements';
import usePopoverConfig from '../hooks/usePopoverConfig';
import { prefixCls as popoverPrefixCls } from '../Popover/style';

import {
  TooltipWrap,
  Arrow,
  ArrowInner,
  ContentWrap,
  tooltipPopupClassName,
  arrowWrapCls,
  arrowCls,
} from './style';

const { Animation, Trigger, Placement } = Popover as any;
const arrowPlacements = getPlacements(10);
const placements = getPlacements();
const Theme = ['light', 'dark'];

export interface TooltipProps {
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 主题风格 */
  theme?: 'light' | 'dark';
  /** 弹出层 */
  popup: ReactNode;
  /** 弹出层类名 */
  popupClassName?: string;
  /** 弹出层方向，默认左上 */
  placement?: string;
  /** 自定义样式 */
  customStyle?: {
    /** 弹出层外层 padding */
    popupWrapperPadding?: string;
  };
  visible?: boolean;
  /** children */
  children?: any;
}

const Tooltip = ({
  popup: _popup,
  theme = 'light',
  popupClassName,
  arrow = true,
  placement = 'topLeft',
  customStyle = {},
  ...rest
}: TooltipProps) => {
  const popup = useMemo(() => {
    return _popup == null ? (
      _popup
    ) : (
      <TooltipWrap themeType={theme}>
        {arrow && (
          <Arrow className={arrowWrapCls}>
            <ArrowInner className={arrowCls} />
          </Arrow>
        )}
        <ContentWrap themeType={theme} customStyle={customStyle}>
          {_popup}
        </ContentWrap>
      </TooltipWrap>
    );
  }, [_popup, arrow, customStyle, theme]);
  const popoverConfigProps = usePopoverConfig();
  return (
    <Popover
      {...popoverConfigProps}
      {...rest}
      placement={placement}
      popupClassName={classnames(tooltipPopupClassName, popupClassName)}
      builtinPlacements={arrow ? arrowPlacements : placements}
      popup={popup}
    />
  );
};

Object.assign(Tooltip, {
  Animation,
  Trigger,
  Placement,
  Theme,
  defaultProps: {},
});

export default Tooltip;
