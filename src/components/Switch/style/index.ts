import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { css } from '@emotion/core';

import config from '../../../config';
import { DesignToken, styleWrap } from '../../../style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-switch';
export const dotCls = prefixCls + '-dot';
export const onTipCls = prefixCls + '-tip-on';
export const offTipCls = prefixCls + '-tip-off';
export const innerCls = prefixCls + '-inner';
export const buttonCls = prefixCls + '-button';

const switchTheme = {
  Width: {
    sm: '44px',
    md: '73px',
    lg: '87px',
  },
  BorderWidth: {
    sm: 0,
    md: '1px',
    lg: '1px',
  },
  BtnPadding: {
    sm: '0',
    md: '2px',
    lg: '2px',
  },
  BtnSize: {
    sm: '24px',
    md: '28px',
    lg: '32px',
  },
};

type Size = 'sm' | 'md' | 'lg';
const SizeMap: Record<Size, DesignToken> = {
  sm: 'T_HEIGHT_SM',
  md: 'T_HEIGHT_MD',
  lg: 'T_HEIGHT_LG',
};

export const SwitchWrap = styleWrap<{
  disabled?: boolean;
  checked?: boolean;
  size: Size;
  iStyle: boolean;
}>({})(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT },
      disabled,
      size,
      checked,
      iStyle,
    } = props;

    const { Width, BtnPadding, BorderWidth, BtnSize } = switchTheme;

    return css`
      position: relative;
      cursor: pointer;
      font-size: 12px;
      display: inline-block;
      vertical-align: middle;
      height: ${DT[SizeMap[size]]};
      width: ${Width[size]};

      .${innerCls} {
        display: inline-flex;
        align-items: center;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border-radius: ${iStyle ? '16px' : '2px'};
        transition: all 0.3s;
        user-select: none;
      }
      .${dotCls} {
        position: absolute;
        top: 50%;
        right: 6px;
        display: ${iStyle ? 'none' : 'block'};
        width: 4px;
        height: 4px;
        margin-top: -2px;
        border-radius: 50%;
        transition: background 0.3s;
      }
      .${buttonCls} {
        position: absolute;
        top: ${iStyle ? '3px' : '0px'};
        left: ${iStyle ? '2px' : '0px'};
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        border: none;
        border-radius: ${iStyle ? '16px' : '2px'};
        cursor: pointer;
        transition: all 0.2s ease-in-out;

        > span {
          display: block;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
          border-radius: ${iStyle ? '16px' : '2px'};
        }
      }
      .${onTipCls}, .${offTipCls} {
        display: block;
        box-sizing: border-box;
        width: 100%;
        text-align: center;
      }

      .${innerCls} {
        color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
        background: ${DT.T_SWITCH_COLOR_BG_INNER_OFF};
        border-color: ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        border-style: solid;
        border-width: ${BorderWidth[size]};
        box-shadow: ${DT.T_SHADOW_INSET_1};
      }

      .${buttonCls} {
        width: ${iStyle ? `${+BtnSize[size].replace('px', '') - 6}px` : `${BtnSize[size]}`};
        height: ${iStyle ? `${+BtnSize[size].replace('px', '') - 6}px` : `${BtnSize[size]}`};
        padding: ${BtnPadding[size]};
        > span {
          background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
          box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
        }
      }

      ${iStyle &&
      css`
        .${buttonCls}:active {
          width: ${+BtnSize[size].replace('px', '') + 4}px;
          transform: translateX(${checked ? -10 : 0}px);
        }
      `}

      .${dotCls} {
        background: ${DT.T_COLOR_TEXT_ERROR};
      }

      ${!disabled &&
      css`
        :hover {
          .${innerCls} {
            border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
            ${checked &&
            css`
              border-color: ${DT.T_SWITCH_COLOR_LINE_INNER_ON};
            `}
          }
        }
      `}

      ${size === 'sm' &&
      css`
        .${onTipCls}, .${offTipCls} {
          display: none;
        }
      `};
      ${size === 'md' &&
      css`
        .${onTipCls} {
          padding-right: ${BtnSize[size]};
        }
        .${offTipCls} {
          padding-left: ${BtnSize[size]};
        }
      `};
      ${size === 'lg' &&
      css`
        .${onTipCls} {
          padding-right: ${BtnSize[size]};
        }
        .${offTipCls} {
          padding-left: ${BtnSize[size]};
        }
      `};

      ${checked
        ? css`
            .${innerCls} {
              color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
              background: ${DT.T_SWITCH_COLOR_BG_INNER_ON};
              border-color: ${DT.T_SWITCH_COLOR_LINE_INNER_ON};
            }
            .${buttonCls} {
              left: 100%;
              margin-left: ${iStyle
                ? `${0 - +BtnSize[size].replace('px', '') + 2}px`
                : `-${BtnSize[size]}`};
            }
            .${dotCls} {
              background: ${DT.T_COLOR_TEXT_SUCCESS};
            }

            .${offTipCls} {
              display: none;
            }
          `
        : css`
            .${onTipCls} {
              display: none;
            }
          `};

      ${disabled &&
      css`
        cursor: default;

        .${innerCls} {
          color: ${DT.T_COLOR_TEXT_SYSTEM_WHITE};
          background: ${DT.T_COLOR_BG_DISABLED_DARK};
          border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
        }
        .${dotCls} {
          background: ${DT.T_COLOR_BG_DISABLED_DARK};
        }
      `};
    `;
  }),
);
