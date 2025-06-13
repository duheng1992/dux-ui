import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from '../../../style';
import config from '../../../config';
import styleWrap from '../../../style/styleWrap';
import { transitionDown } from '../../../style/animation';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-numberinput';
export const inputWrapCls = prefixCls + '-input-wrap';
export const inputCls = prefixCls + '-input';
export const suffixCls = prefixCls + '-suffix';
export const handlerCls = prefixCls + '-handler';
export const handlerUpCls = handlerCls + '-up';
export const handlerDownCls = handlerCls + '-down';
export const handlerDisabledCls = handlerCls + '-disabled';

const NumberInputWrap: any = styleWrap()(
  styled('div')((props) => {
    const {
      theme: { designTokens: DT, Height, HeightNumber },
      styleType,
      focused,
      size,
      hideHandler,
      disabled,
      shadowed,
    } = props as {
      theme: any;
      styleType: string;
      focused: boolean;
      size: string;
      hideHandler: any;
      disabled: boolean;
      shadowed: boolean;
    };

    return css`
      position: relative;
      box-sizing: border-box;
      border-radius: ${DT.T_CORNER_LG};
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      height: ${Height[size]};
      ${inlineBlockWithVerticalMixin};

      .${inputWrapCls} {
        position: relative;
      }
      .${inputCls} {
        margin: 0;
        padding: 0;
        color: inherit;
        border: none;
        outline: none;
      }
      .${suffixCls} {
        margin: 0 4px;
        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        ${inlineBlockWithVerticalMixin};
      }
      .${handlerUpCls}, .${handlerDownCls} {
        position: absolute;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        vertical-align: middle;
        background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
        border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        border-radius: ${DT.T_CORNER_LG};
        box-shadow: ${shadowed ? DT.T_SHADOW_BUTTON_DEFAULT : 0};
        cursor: pointer;

        :hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          box-shadow: ${shadowed ? DT.T_SHADOW_BUTTON_HOVER : 0};
        }

        &.${handlerDisabledCls} {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
          cursor: default;
          pointer-events: none;
          fill: ${DT.T_COLOR_TEXT_DISABLED};
        }
      }

      ${disabled &&
      css`
        pointer-events: none;
        color: ${DT.T_COLOR_TEXT_DISABLED};
        -webkit-text-fill-color: currentcolor;
      `};

      .${inputCls} {
        height: ${HeightNumber[size] - 2}px;
        line-height: ${HeightNumber[size] - 2}px;

        ${inlineBlockWithVerticalMixin};

        ${disabled &&
        css`
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
        `};

        &::placeholder {
          color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
          opacity: 1;
        }
      }

      ${styleType === 'default' &&
      css`
        border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        padding-right: ${HeightNumber[size] - 6}px;
        border-right-width: 0;

        &:hover {
          border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        }

        .${inputWrapCls} {
          background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
          box-shadow: ${shadowed ? DT.T_SHADOW_INSET_DEFAULT : 0};
          :hover {
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
          }
        }
        ${focused &&
        css`
          &,
          &:hover {
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          }
          .${inputWrapCls} {
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
          }
        `};

        ${disabled &&
        css`
          border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
          .${inputWrapCls} {
            box-shadow: none;
          }
        `};

        .${inputCls} {
          width: ${HeightNumber[size] + 6}px;
          padding: 0 0 0 8px;
          text-align: left;
          background: transparent;
          box-shadow: none;
        }

        .${handlerUpCls}, .${handlerDownCls} {
          right: 0;
          z-index: 1;
          box-sizing: content-box;
          width: ${HeightNumber[size] - 6}px;
          height: ${(+Height[size].replace('px', '') - (shadowed ? 2 : 6)) / 2}px;
                   border-radi
          border-radius: ${DT.T_CORNER_MD};

          &:hover {
            color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          }
        }

        .${handlerUpCls} {
          top: -1px;
          padding-top: 1px;
          border-width: ${shadowed ? '0 0 0 1px' : '1px'};
        }
        .${handlerDownCls} {
          bottom: 0;
          border-width: ${shadowed ? '1px 0 0 1px' : '1px'};
          border-top-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
        }

        ${hideHandler &&
        css`
          padding-right: 0;
          border-right-width: 1px;
        `};
      `};

      ${styleType === 'split' &&
      css`
        padding: 0 ${Height[size]};
        .${inputCls} {
          width: ${HeightNumber[size] + 6}px;
          padding: 0 8px;
          text-align: left;
          background: transparent;
          box-shadow: none;
        }
        .${inputWrapCls} {
          margin: 0 -1px 0 -1px;
          margin: 0;
          background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
          border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          box-shadow: ${shadowed ? DT.T_SHADOW_INSET_DEFAULT : 0};
          transition: ${transitionDown};
          &:hover {
            z-index: 1;
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
          }
          ${focused &&
          css`
            border-color: ${DT.T_INPUT_COLOR_BG_ACTIVE};
          `};
          ${disabled &&
          css`
            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
          `};
        }
        .${handlerUpCls}, .${handlerDownCls} {
          top: 0;
          width: ${Height[size]};
          height: ${Height[size]};
          text-align: center;
          border-width: 1px;

          &:hover {
            z-index: 1;
          }
        }
        .${handlerUpCls} {
          right: 0;
        }
        .${handlerDownCls} {
          left: 0;
        }
        ${focused &&
        css`
          .${inputWrapCls}, .${inputWrapCls}:hover {
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          }
        `};
        ${disabled &&
        css`
          box-shadow: none;
        `};
        ${hideHandler &&
        css`
          padding: 0;
        `};
      `};

      ${styleType === 'pagination' &&
      css`
        padding: 0 ${Height[size]};
        .${inputCls} {
          width: ${HeightNumber[size] - 2}px;
          margin: 0 4px;
          text-align: center;
          background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
          border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
          box-shadow: ${shadowed ? DT.T_SHADOW_INSET_DEFAULT : 0};
          transition: ${transitionDown};

          &:hover {
            z-index: 1;
            background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
            border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
          }
          ${focused &&
          css`
            &,
            &:hover {
              background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
              border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
            }
          `};
          ${disabled &&
          css`
            border-color: ${DT.T_COLOR_LINE_DISABLED_DARK};
            box-shadow: none;
            background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          `};
        }
        .${handlerUpCls}, .${handlerDownCls} {
          top: 0;
          width: ${Height[size]};
          height: ${Height[size]};
          text-align: center;
          border-width: 1px;
          &:hover {
            z-index: 1;
          }
        }
        .${handlerUpCls} {
          right: 0;
        }
        .${handlerDownCls} {
          left: 0;
        }
        .${suffixCls} {
          margin-left: 0;
        }
        ${hideHandler &&
        css`
          padding: 0;
          margin: 0;

          .${inputCls} {
            margin: 0;
          }
          .${suffixCls} {
            margin-right: 0px;
            margin-left: 4px;
          }
        `};
      `};
    `;
  }),
);

export { NumberInputWrap };
