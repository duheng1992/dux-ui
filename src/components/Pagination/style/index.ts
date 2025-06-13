import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { inlineBlockWithVerticalMixin } from '../../../style';
import config from '../../../config';
import styleWrap from '../../../style/styleWrap';

const { prefixCls: _prefixCls } = config;

export const prefixCls = _prefixCls + '-pagination';

export const PaginationWrap = styleWrap()(
  styled('ul')((props) => {
    const {
      theme: { designTokens: DT, fontSize, Height, HeightNumber },
      size,
    } = props as any;

    return css`
      font-size: ${fontSize};
      user-select: none;
      ${inlineBlockWithVerticalMixin};

      .${prefixCls} {
        &-item,
        &-prev,
        &-next,
        &-jump-prev,
        &-jump-next {
          box-sizing: border-box;
          padding: 0 2px;
          text-align: center;
          border-radius: 2px;
          outline: none;
          cursor: pointer;
        }
        &-item,
        &-prev,
        &-next,
        &-jump-prev,
        &-jump-next,
        &-total {
          ${inlineBlockWithVerticalMixin};
          min-width: ${Height[size]};
          height: ${Height[size]};
          margin-right: 5px;
          line-height: ${HeightNumber[size] - 2}px;
        }

        &-item {
          color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
          background: ${DT.T_COLOR_BG_DEFAULT_LIGHT};
          border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_LIGHT};
        }
        &-item:hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
          border: 1px solid ${DT.T_COLOR_LINE_PRIMARY_HOVER};
        }
        &-prev,
        &-next {
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
          box-shadow: ${DT.T_SHADOW_BUTTON_DEFAULT};
        }
        &-prev:hover,
        &-next:hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
        }

        &-jump-prev,
        &-jump-next {
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        }
        &-jump-prev:hover,
        &-jump-next:hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_HOVER};
        }

        &-item-active,
        &-item-active:hover {
          color: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          background: ${DT.T_BUTTON_SECONDARY_COLOR_BG_DEFAULT};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
          box-shadow: ${DT.T_SHADOW_BUTTON_HOVER};
          cursor: default;
        }
        &-disabled,
        &-disabled:hover {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border: 1px solid ${DT.T_COLOR_LINE_DISABLED_DARK};
          box-shadow: none;
          cursor: default;
        }

        &-prev-icon,
        &-next-icon {
          cursor: inherit;
        }

        &-options {
          &,
          &-size-changer,
          &-quick-jumper {
            display: inline-block;
            vertical-align: middle;
          }
          &-size-changer {
            margin-right: 5px;
          }
          &-gobutton {
            margin-left: 5px;
          }
        }
      }
    `;
  }),
);
