import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { injectGlobal } from 'emotion';

import { prefixCls as popoverPrefixCls } from '../../Popover/style';
import config from '../../../config';
import { styleWrap } from '../../../style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-tooltip';

const arrowWidth = '6px';
const borderWidth = '1px';

export const tooltipPopupClassName = prefixCls + '-popup';
export const contentCls = prefixCls + '-content';

export const arrowWrapCls = popoverPrefixCls + '-span' + '-arrow-wrap';
export const arrowCls = popoverPrefixCls + '-span' + '-arrow-inner';

export const ContentWrap = styleWrap<{
  themeType: 'light' | 'dark';
  customStyle?: { popupWrapperPadding?: string };
}>({
  className: contentCls,
})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      themeType,
      customStyle,
    } = props;

    const map = {
      light: {
        text: DT.T_COLOR_TEXT_DEFAULT_DARK,
        border: DT.T_POPOVER_COLOR_LINE_LIGHT,
        background: DT.T_POPOVER_COLOR_BG_LIGHT,
      },
      dark: {
        text: DT.T_COLOR_TEXT_WHITE,
        border: DT.T_POPOVER_COLOR_BG_DARK,
        background: DT.T_POPOVER_COLOR_BG_DARK,
      },
    };
    const colorMap = map[themeType];
    return css`
      line-height: 20px;
      padding: ${customStyle?.popupWrapperPadding || '8px 10px'};
      border: ${DT.T_LINE_WIDTH_BASE} solid ${colorMap.border};
      border-radius: 3px;
      font-size: 12px;
      text-align: left;
      text-decoration: none;
      word-break: keep-all;
      box-sizing: border-box;
      color: ${colorMap.text};
      background: ${colorMap.background};
    `;
  }),
);

const arrowMixin = css`
  display: inline-block;
  position: absolute;
  width: 0;
  height: 0;
  border-width: 0;
  border-color: transparent;
  border-style: solid;
`;

export const Arrow = styled('span')`
  ${arrowMixin};
`;
export const ArrowInner = styled('span')`
  ${arrowMixin};
`;

injectGlobal`
    .${tooltipPopupClassName} {
        &.${popoverPrefixCls}-placement-bottom,
        &.${popoverPrefixCls}-placement-bottomLeft,
        &.${popoverPrefixCls}-placement-bottomRight {
            .${arrowWrapCls}, .${arrowCls} {
                margin-left: -${arrowWidth};
                border-width: 0 ${arrowWidth} ${arrowWidth} ${arrowWidth};
                border-top-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
            }
            .${arrowWrapCls} {
                top: -${arrowWidth};
            }
            .${arrowCls} {
                top: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-top,
        &.${popoverPrefixCls}-placement-topLeft,
        &.${popoverPrefixCls}-placement-topRight {
            .${arrowWrapCls}, .${arrowCls} {
                margin-left: -${arrowWidth};
                border-width: ${arrowWidth} ${arrowWidth} 0 ${arrowWidth};
                border-bottom-color: transparent;
                border-left-color: transparent;
                border-right-color: transparent;
            }
            .${arrowWrapCls} {
                bottom: -${arrowWidth};
            }
            .${arrowCls} {
                bottom: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-left,
        &.${popoverPrefixCls}-placement-leftTop,
        &.${popoverPrefixCls}-placement-leftBottom {
            .${arrowWrapCls}, .${arrowCls} {
                margin-top: -${arrowWidth};
                border-width: ${arrowWidth} 0 ${arrowWidth} ${arrowWidth};
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-right-color: transparent;
            }
            .${arrowWrapCls} {
                right: -${arrowWidth};
            }
            .${arrowCls} {
                right: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-right,
        &.${popoverPrefixCls}-placement-rightTop,
        &.${popoverPrefixCls}-placement-rightBottom {
            .${arrowWrapCls}, .${arrowCls} {
                margin-top: -${arrowWidth};
                border-width: ${arrowWidth} ${arrowWidth} ${arrowWidth} 0;
                border-top-color: transparent;
                border-bottom-color: transparent;
                border-left-color: transparent;
            }
            .${arrowWrapCls} {
                left: -${arrowWidth};
            }
            .${arrowCls} {
                left: ${borderWidth};
            }
        }
        &.${popoverPrefixCls}-placement-bottomLeft,
        &.${popoverPrefixCls}-placement-topLeft {
            .${arrowWrapCls} {
                left: 16px;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-bottomRight,
        &.${popoverPrefixCls}-placement-topRight {
            .${arrowWrapCls} {
                right: 10px;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-leftTop,
        &.${popoverPrefixCls}-placement-rightTop {
            .${arrowWrapCls} {
                top: 5px;
                margin-top: 0;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
        &.${popoverPrefixCls}-placement-leftBottom,
        &.${popoverPrefixCls}-placement-rightBottom {
            .${arrowWrapCls} {
                bottom: 5px;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
        &.${popoverPrefixCls}-placement-top,
        &.${popoverPrefixCls}-placement-bottom {
            .${arrowWrapCls} {
                left: 50%;
            }
            .${contentCls} {
                min-width: 32px;
            }
        }
        &.${popoverPrefixCls}-placement-left,
        &.${popoverPrefixCls}-placement-right {
            .${arrowWrapCls} {
                top: 50%;
            }
            .${contentCls} {
                min-height: 22px;
            }
        }
    }
`;

export const TooltipWrap = styleWrap<{ themeType: 'light' | 'dark' }>({})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      themeType,
    } = props;

    const map = {
      light: {
        border: DT.T_POPOVER_COLOR_LINE_LIGHT,
        background: DT.T_POPOVER_COLOR_BG_LIGHT,
      },
      dark: {
        border: DT.T_POPOVER_COLOR_BG_DARK,
        background: DT.T_POPOVER_COLOR_BG_DARK,
      },
    };
    const colorMap = map[themeType];
    return css`
      .${arrowWrapCls} {
        border-color: ${colorMap.border};
      }
      .${arrowCls} {
        border-color: ${colorMap.background};
      }
    `;
  }),
);
