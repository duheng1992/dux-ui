import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { Calendar, Month } from '@z-r/calendar';

import config from '../../../config';
import { styleWrap, Theme } from '../../../style';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-calendar';
export const tableCls = prefixCls + '-table';

/* stylelint-disable no-duplicate-selectors */
export const calendarMixin = (props: { theme: Theme; customStyle?: { boxShadow?: boolean } }) => {
  const {
    theme: { designTokens: DT },
    customStyle,
  } = props;

  return css`
    &.${prefixCls} {
      position: relative;
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      background: ${DT.T_COLOR_BG_DEFAULT_NORMAL};
      outline: none;
      ${customStyle?.boxShadow === false
        ? null
        : css`
            box-shadow: ${DT.T_SHADOW_BLOCK_DEFAULT_LG};
          `}
    }

    .${prefixCls}-header {
      display: flex;
      flex: none;
      align-items: center;
      box-sizing: border-box;
      width: 100%;
      height: 44px;
      padding: 0 8px;
      border-bottom: 1px solid ${DT.T_COLOR_BG_DEFAULT_DARK};
      user-select: none;
    }
    .${prefixCls}-header-button {
      display: block;
      width: 28px;
      color: ${DT.T_COLOR_TEXT_REMARK_DARK};
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      :hover {
        color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
      }
    }
    .${prefixCls}-header-switcher-wrap {
      display: block;
      flex: 1;
      font-weight: 600;
      font-size: 14px;
      text-align: center;
      .${prefixCls}-header-switcher {
        cursor: pointer;
      }
      .${prefixCls}-header-switcher+.${prefixCls}-header-switcher {
        margin-left: 8px;
      }
    }
    .${prefixCls}-row {
      display: flex;
      align-items: center;
      .${prefixCls}-cell {
        flex: 1;
      }
    }
    .${prefixCls}-thead {
      padding: 0 8px;
      font-weight: 600;
      font-size: 14px;
      background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
      .${prefixCls}-cell {
        line-height: 32px;
        text-align: center;
        vertical-align: middle;
      }
    }
    .${prefixCls}-tbody {
      display: flex;
      flex-direction: column;
      padding: 0 8px 8px;
      font-size: 12px;
      .${prefixCls}-row {
        margin-top: 4px;
      }
      .${prefixCls}-cell {
        display: inline-block;
        height: 28px;
        margin: 0 auto;
        line-height: 28px;
        text-align: center;
        border-radius: 2px;
        cursor: pointer;
        user-select: none;

        :not(.${prefixCls}-cell-empty):hover {
          background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
        }
        &.${prefixCls}-cell-empty {
          cursor: default;
        }
        &.${prefixCls}-cell.${prefixCls}-prev, &.${prefixCls}-cell.${prefixCls}-next {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          :hover {
            background: ${DT.T_COLOR_BG_DEFAULT_HOVER};
          }
        }
        &.${prefixCls}-cell.${prefixCls}-disabled {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border-radius: 0;
          cursor: default;
          &.${prefixCls}-prev, &.${prefixCls}-next {
            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          }
          &.${prefixCls}-cell-disabled-first {
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
          }
          &.${prefixCls}-cell-disabled-last {
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
          }
        }

        &.${prefixCls}-now {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
        }
        &.${prefixCls}-cell.${prefixCls}-active {
          color: ${DT.T_COLOR_TEXT_WHITE};
          font-weight: bold;
          background: ${DT.T_COLOR_BG_PRIMARY_1};
        }
      }
    }
    .${prefixCls}-prev, .${prefixCls}-next, .${prefixCls}-disable {
      color: ${DT.T_COLOR_TEXT_DISABLED};
    }
    .${prefixCls}-date-wrap,
      .${prefixCls}-month-wrap,
      .${prefixCls}-year-wrap,
      .${prefixCls}-decade-wrap {
      display: flex;
      flex-direction: column;
      height: 100%;
      .${prefixCls}-body {
        display: flex;
        flex-grow: 1;
      }
      .${tableCls} {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        height: 100%;
      }
      .${prefixCls}-tbody {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
      }
      .${prefixCls}-row {
        flex-grow: 1;
      }
    }
    &.${prefixCls} .${prefixCls} {
      height: 100%;
    }
  `;
};

const shouldForwardProp = (propName: string): boolean => {
  return !({ customStyle: 1, theme: 1 } as { [key: string]: 1 })[propName];
};

export const SCalendar = styleWrap<any>({})(
  styled(Calendar, { shouldForwardProp })`
    ${calendarMixin};
  `,
);

export const SMonthCalendar = styleWrap<any>({})(
  styled(Month, { shouldForwardProp })`
    ${calendarMixin};
  `,
);
