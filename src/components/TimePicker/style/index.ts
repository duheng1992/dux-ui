import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Time } from '@z-r/calendar';

import { styleWrap } from '../../../style';
import config from '../../../config';
import isFirefox from '../../../utils/isFirefox';
import isIE from '../../../utils/isIE';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-timepicker';
export const timePrefixCls = _prefixCls + '-time';
export const shortcutCls = prefixCls + '-shortcut';
export const footerCls = prefixCls + '-footer';

const shouldForwardProp = (propName: string): boolean => {
  return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const SPopup = styleWrap({})(
  styled.div((props) => {
    const {
      theme: { designTokens: DT },
    } = props;
    return css`
      background: ${DT.T_COLOR_BG_DEFAULT_DARK};
      box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
      border-radius: 2px;
      .${timePrefixCls} {
        padding: 0 0 0 16px;
        background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
        border-left: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
      }
      .${footerCls} {
        padding: 12px;
        .${shortcutCls} {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          cursor: pointer;
        }
      }
    `;
  }),
);

const StepperHeight = 32;
const SpacingHeight = 104;
const StepperVisibleHeight = 28;
const ActiveOffset = (SpacingHeight * 2 + StepperHeight - StepperVisibleHeight) / 2;
const StepperActiveOffset = (StepperHeight - StepperVisibleHeight) / 2;

export const STime = styleWrap<any>({})(
  styled(Time, { shouldForwardProp })((props) => {
    const {
      theme: { designTokens: DT },
    } = props;
    return css`
      display: flex;
      .${timePrefixCls}-wrap {
        position: relative;
        display: flex;
        overflow: hidden;
        .${timePrefixCls}-scroller {
          z-index: 1;
          width: 56px;
          height: ${StepperHeight}px;
          padding: ${SpacingHeight}px 0;
          overflow-x: hidden;
          overflow-y: hidden;
          :hover {
            overflow-y: scroll;
          }

          ${(isFirefox || isIE) &&
          css`
            ::after {
              display: block;
              height: ${SpacingHeight}px;
              visibility: hidden;
              content: ' ';
            }
          `}

          .${timePrefixCls}-stepper {
            width: 40px;
            color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
            line-height: ${StepperHeight}px;
            text-align: center;
            cursor: pointer;
            user-select: none;
            &.${timePrefixCls}-active {
              font-weight: bold;
            }
          }
          .${timePrefixCls}-stepper:hover {
            position: relative;
          }
          ::before,
          .${timePrefixCls}-stepper:hover::after {
            position: absolute;
            z-index: -1;
            display: block;
            box-sizing: border-box;
            width: 40px;
            height: ${StepperVisibleHeight}px;
            background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
            content: ' ';
            pointer-events: none;
          }
          ::before {
            top: ${ActiveOffset}px;
            left: 0;
          }
          .${timePrefixCls}-stepper:hover::after {
            top: ${StepperActiveOffset}px;
            left: 0;
          }
        }
      }
    `;
  }),
);
