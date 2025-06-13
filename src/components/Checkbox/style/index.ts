import styled from '@emotion/styled';
import { css } from '@emotion/core';

import config from '../../../config';
import { inlineBlockWithVerticalMixin, styleWrap, getHeightBySize, Theme } from '../../../style';
import { Size } from '../../../type';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-checkbox';
export const cardCls = prefixCls + '-card';
export const iconCls = prefixCls + '-icon';
export const iconWrapCls = prefixCls + '-icon-wrap';
export const contentCls = prefixCls + '-content';
export const disabledCls = prefixCls + '-disabled';
export const checkedCls = prefixCls + '-checked';
export const indeterminateCls = prefixCls + '-indeterminate';
export const groupCls = prefixCls + '-group';

interface CheckboxProps {
  size?: Size;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
}

export const CheckboxWrap = styleWrap<CheckboxProps>({})(
  styled.span((props) => {
    const {
      theme: { designTokens: DT },
      size = 'md',
    } = props;

    return css`
      cursor: pointer;
      position: relative;
      white-space: nowrap;
      min-height: ${getHeightBySize(DT, size)};
      line-height: ${getHeightBySize(DT, size)};
      ${inlineBlockWithVerticalMixin};

      font-size: 0;
      color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
      > * {
        font-size: ${DT.T_TYPO_FONT_SIZE_1};
      }

      .${contentCls} {
        display: inline-block;
        max-height: 100%;
        margin-left: 8px;
        vertical-align: middle;
      }

      &.${disabledCls} {
        color: ${DT.T_COLOR_TEXT_DISABLED};
        cursor: default;
      }
      ${iconMixin(props)};
    `;
  }),
);

export const SIconWrap = styleWrap<CheckboxProps>({
  className: iconWrapCls,
})(
  styled.span((props) => {
    const {
      theme: { designTokens: DT },
      checked,
      indeterminate,
      disabled,
    } = props;
    return css`
      &.${iconWrapCls} {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: content-box;
        width: 14px;
        height: 14px;
        padding-top: 1px;
        overflow: hidden;
        vertical-align: middle;
        border: 1px solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
        border-radius: 2px;
      }

      .${iconCls} {
        display: block;
        color: white;
        visibility: hidden;
        opacity: 0;
      }

      ${(indeterminate || checked) &&
      css`
        &.${iconWrapCls} {
          background: ${DT.T_COLOR_TEXT_PRIMARY_DEFAULT};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
        .${iconCls} {
          visibility: visible;
          opacity: 1;
          fill: ${DT.T_COLOR_TEXT_DEFAULT_NORMAL};
        }
      `}

      ${disabled &&
      css`
        &.${iconWrapCls} {
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
        }
      `}

            ${disabled &&
      (checked || indeterminate) &&
      css`
        &.${iconWrapCls} {
          background: none;
        }
        .${iconCls} {
          fill: ${DT.T_COLOR_TEXT_DISABLED};
        }
      `}
    `;
  }),
);

export const iconMixin = (props: CheckboxProps & { theme: Theme }) => {
  const {
    theme: { designTokens: DT },
    disabled,
  } = props;
  return (
    !disabled &&
    css`
      :hover {
        .${iconWrapCls} {
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
      }
    `
  );
};

export const CheckboxGroupWrap = styleWrap({
  className: groupCls,
})(styled.div`
  .${prefixCls} {
    margin-right: 8px;

    &:last-child {
      margin-right: 0;
    }
  }
`);
