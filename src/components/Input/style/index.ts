import styled from '@emotion/styled';
import { css } from '@emotion/core';
import classnames from 'classnames';

import Icon from '../../Icon';
import {
  execSizeCal,
  getControlFontSizeBySize,
  getControlHeightBySize,
  getControlSpacingBySize,
  inlineBlockWithVerticalMixin,
  styleWrap,
} from '../../../style';
import config from '../../../config';

import { InputProps } from '../Input';

const { prefixCls: _prefixCls } = config;
export const prefixCls = _prefixCls + '-input';
export const focusedCls = prefixCls + '-focused';
export const disabledCls = prefixCls + '-disabled';
export const blockCls = prefixCls + '-block';
export const inputWrapCls = prefixCls + '-wrap';
export const inputPrefixCls = prefixCls + '-prefix';
export const inputSuffixCls = prefixCls + '-suffix';
export const clearCls = prefixCls + '-clear';

export const SearchIcon = styled(Icon)`
  cursor: pointer;
`;

export const SWrap = styleWrap<
  Pick<InputProps, 'disabled' | 'status' | 'customStyle'> &
    Required<Pick<InputProps, 'size'>> & {
      focused: boolean;
      empty: boolean;
    },
  HTMLSpanElement
>({
  className: ({ focused, disabled }) =>
    classnames(prefixCls, focused && focusedCls, disabled && disabledCls),
})(
  styled.span((props) => {
    const {
      theme: { designTokens: DT },
      disabled,
      size,
      focused,
      status,
      customStyle,
      empty,
    } = props;
    const height = getControlHeightBySize(DT, size);
    const fontSize = getControlFontSizeBySize(DT, size);
    const spacing = getControlSpacingBySize(DT, size);
    const halfSpacing = execSizeCal(spacing, '/2');

    return css`
      position: relative;
      box-sizing: border-box;
      height: ${height};
      max-width: 100%;
      font-size: ${fontSize};
      border-radius: ${DT.T_CORNER_LG};
      color: ${DT.T_COLOR_TEXT_DEFAULT_LIGHT};
      fill: currentColor;
      border: ${DT.T_LINE_WIDTH_BASE} solid ${DT.T_COLOR_LINE_DEFAULT_DARK};
      /* box-shadow: ${DT.T_SHADOW_INSET_DEFAULT}; */
      background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
      transition: 0.18s cubic-bezier(0.4, 0, 0.2, 1);
      ${inlineBlockWithVerticalMixin};

      :hover {
        color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
        background: ${DT.T_INPUT_COLOR_BG_DEFAULT};
        border-color: ${DT.T_COLOR_LINE_DEFAULT_DARK};
      }

      .${clearCls} {
        display: flex;
        align-items: center;
        height: 100%;
        color: ${DT.T_COLOR_TEXT_REMARK_DARK};
        opacity: 0;
        transition: opacity 0.3s;
        fill: ${DT.T_COLOR_TEXT_REMARK_DARK};
      }
      .${inputWrapCls}, .${inputPrefixCls}, .${inputSuffixCls}, .${clearCls}, input {
        padding: 0 ${halfSpacing};
      }

      &.${blockCls} {
        display: block;
      }

      .${inputWrapCls} {
        display: flex;
        align-items: center;
        height: 100%;
      }
      .${inputPrefixCls}, .${inputSuffixCls} {
        display: flex;
        align-items: center;
        height: 100%;
      }

      input {
        flex: 1 1 130px;
        box-sizing: border-box;
        min-width: 0px;
        height: 100%;
        margin: 0;
        color: inherit;
        font-size: inherit;
        &,
        &:hover,
        &:focus {
          background: none;
          border: none;
          outline: none;
        }
        &::placeholder {
          color: ${DT.T_COLOR_TEXT_REMARK_LIGHT};
          opacity: 1;
        }
        &::-ms-clear {
          display: none;
        }
      }
      ${!empty &&
      !disabled &&
      css`
        :hover,
        &.${focusedCls} {
          .${clearCls} {
            cursor: pointer;
            opacity: 1;
          }
        }
      `}

      ${focused &&
      !disabled &&
      css`
        && {
          color: ${DT.T_COLOR_TEXT_DEFAULT_DARK};
          background: ${DT.T_INPUT_COLOR_BG_ACTIVE};
          border-color: ${DT.T_COLOR_LINE_PRIMARY_DEFAULT};
        }
      `};

      ${status === 'error' &&
      css`
        &&& {
          background: ${DT.T_COLOR_BG_ERROR_LIGHT};
          border-color: ${DT.T_COLOR_LINE_ERROR_DARK};
          box-shadow: ${DT.T_SHADOW_INSET_ERROR};
        }
      `};

      ${disabled &&
      css`
        box-shadow: none;
        &,
        &:hover {
          color: ${DT.T_COLOR_TEXT_DISABLED};
          background: ${DT.T_COLOR_BG_DISABLED_LIGHT};
          border-color: ${DT.T_COLOR_LINE_DISABLED_LIGHT};
                border-color: @prettier-plac
          -webkit-text-fill-color: ${DT.T_COLOR_TEXT_DISABLED};
        }
      `};

      ${customStyle?.border &&
      css`
        border: ${customStyle.border} !important;
      `}
      ${customStyle?.boxShadow &&
      css`
        box-shadow: ${customStyle.boxShadow} !important;
      `}
            ${customStyle?.background &&
      css`
        background: ${customStyle.background} !important;
      `}
    `;
  }),
);
