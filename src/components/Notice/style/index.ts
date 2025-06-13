import styled from '@emotion/styled';
import { css } from '@emotion/core';

import Icon from '../../Icon';
import styleWrap from '../../../style/styleWrap';
import config from '../../../config';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-notice';
export const iconCls = prefixCls + '-icon';
export const actionWrapCls = prefixCls + '-action-wrap';

const map = {
  default: 'info',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'success',
  disabled: 'disabled',
};

export const NoticeIconWrap = styled('span')`
  display: table-cell;
  font-size: 18px;
  width: 18px;
  color: inherit;
  padding-right: 8px;
`;

export const ContentWrap = styled('div')`
  display: table-cell;
  vertical-align: middle;
`;

export const ActionWrap = styled('div')`
  display: table-cell;
  padding-left: 8px;
  white-space: nowrap;
  text-align: right;
  > * {
    vertical-align: middle;
  }
`;

export const CloseWrap = styled('div')`
  display: table-cell;
  padding-left: 8px;
  white-space: nowrap;
  text-align: right;
  width: 12px;
`;

export const CloseIcon = styled(Icon)`
  cursor: pointer;
`;

const themeMixin = (props: any) => {
  const {
    styleType,
    theme: { designTokens: DT },
  } = props;

  const style = (map as any)[styleType || 'default'];
  const colorMap = (
    {
      info: {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK,
        border: DT.T_COLOR_LINE_NOTICE_LIGHT,
        background: DT.T_COLOR_BG_NOTICE_LIGHT,
        icon: DT.T_COLOR_TEXT_PRIMARY_DEFAULT,
      },
      success: {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK,
        border: DT.T_COLOR_LINE_SUCCESS_LIGHT,
        background: DT.T_COLOR_BG_SUCCESS_LIGHT,
        icon: DT.T_COLOR_TEXT_SUCCESS,
      },
      warning: {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK,
        border: DT.T_COLOR_LINE_WARNING_LIGHT,
        background: DT.T_COLOR_BG_WARNING_LIGHT,
        icon: DT.T_COLOR_TEXT_WARNING,
      },
      error: {
        color: DT.T_COLOR_TEXT_DEFAULT_DARK,
        border: DT.T_COLOR_LINE_ERROR_LIGHT,
        background: DT.T_COLOR_BG_ERROR_LIGHT,
        icon: DT.T_COLOR_TEXT_ERROR,
      },
      disabled: {
        color: DT.T_COLOR_TEXT_DISABLED,
        border: DT.T_COLOR_LINE_DISABLED_LIGHT,
        background: DT.T_COLOR_BG_DISABLED,
        icon: DT.T_COLOR_TEXT_DISABLED,
      },
    } as any
  )[style];

  return css`
    color: ${colorMap.color};
    border: ${DT.T_LINE_WIDTH_BASE} solid ${colorMap.border};
    background: ${colorMap.background};
    .${iconCls} {
      color: ${colorMap.icon};
      vertical-align: middle;
      fill: ${colorMap.icon};
    }
    .${actionWrapCls} {
      color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
    }
  `;
};
// ${ActionWrap}里边只能是字符串，不能是对象

export const NoticeWrap = styleWrap()(styled('div')`
  display: table;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 16px;
  margin: 0;
  border-radius: 1px;
  line-height: 18px;
  overflow: hidden;

  ${themeMixin};
`);
